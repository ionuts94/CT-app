// SignaturePad.tsx
// deps: npm i perfect-freehand
import React, { useEffect, useRef, useState } from "react";
import getStroke from "perfect-freehand";

type Point = [number, number, number];

// strokes -> points -> [x,y,t]
type PointsPayload = number[][][];

export type SignaturePadProps = {
  className?: string;
  height?: number;
  background?: string;      // "transparent" pentru PNG cu alpha
  strokeColor?: string;
  strokeSize?: number;      // implicit 4 (din codul tău)
  padding?: number;         // padding pentru trim
  onSaveSVG?: (svg: string) => void;
  onSavePNG?: (dataUrl: string) => void;

  // 🔥 onChange trimite obiect {svg, png?, points}
  onChange?: (payload: { svg: string; png: string; points: PointsPayload }) => void;
  onChangeMode?: "trimmed" | "raw";            // ce SVG/PNG trimitem în onChange (default: trimmed)
  onChangeDebounceMs?: number;                 // pauză după stop desen (default: 120ms)
  onChangeIncludePngLive?: boolean;            // dacă vrei PNG și în timpul desenului (default: false)

  showSaveSvg?: boolean,
  showSavePng?: boolean
};

const DEFAULTS = {
  height: 220,
  background: "#ffffff",
  strokeColor: "#111111",
  strokeSize: 4,     // păstrat din codul tău
  padding: 6,
  onChangeMode: "trimmed" as const,
  onChangeDebounceMs: 120,
  onChangeIncludePngLive: false,
  showSaveSvg: false,
  showSavePng: false,
};

/* ----------------------- Utils (identice cu logica ta) ----------------------- */

function strokeOptions(size: number) {
  return { size, thinning: 0.5, smoothing: 0.85, streamline: 0.65, simulatePressure: true } as const;
}

function smoothCatmullRom(points: Point[], resolution = 10): Point[] {
  if (points.length < 3) return points;
  const res: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    for (let t = 0; t < resolution; t++) {
      const tt = t / resolution, tt2 = tt * tt, tt3 = tt2 * tt;
      const x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * tt + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * tt2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * tt3);
      const y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * tt + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * tt2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * tt3);
      const tms = p1[2] + (p2[2] - p1[2]) * tt;
      res.push([x, y, tms]);
    }
  }
  res.push(points[points.length - 1]);
  return res;
}

function getSvgPathFromStroke(points: number[][]) {
  if (!points.length) return "";
  const d = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  return `${d} Z`;
}

// default la 4 ca în restul codului
function getBoundsFromStrokes(strokes: Point[][], padding = 6, strokeSize = 4) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const s of strokes) for (const [x, y] of s) { if (x < minX) minX = x; if (y < minY) minY = y; if (x > maxX) maxX = x; if (y > maxY) maxY = y; }
  if (!isFinite(minX)) return { minX: 0, minY: 0, width: 0, height: 0 };
  const pad = padding + strokeSize;
  minX -= pad; minY -= pad; maxX += pad; maxY += pad;
  return { minX, minY, width: maxX - minX, height: maxY - minY };
}

/* ----------------------- 🔁 Exporturi reutilizabile ----------------------- */

/** Export SVG (raw/trimmed) direct din strokes — refolosibil în orice componentă */
export function exportSignatureSVGFromStrokes(
  strokes: Point[][],
  opts: {
    mode?: "trimmed" | "raw";
    width?: number;   // necesar pentru "raw"
    height?: number;  // necesar pentru "raw"
    strokeSize?: number;
    strokeColor?: string;
    padding?: number;
    smoothingResolution?: number;
  } = {}
): string {
  const {
    mode = "trimmed",
    width,
    height,
    strokeSize = 4,
    strokeColor = "#111111",
    padding = 6,
    smoothingResolution = 10,
  } = opts;

  const paths = strokes.map(stroke => {
    const pts = smoothCatmullRom(stroke, smoothingResolution).map(p => [p[0], p[1]]) as [number, number][];
    const outline = getStroke(pts, strokeOptions(strokeSize));
    if (!outline.length) return "";
    return `<path d="${getSvgPathFromStroke(outline)}" fill="${strokeColor}"/>`;
  }).join("\n");

  if (!paths.trim()) return "";

  if (mode === "raw") {
    if (typeof width !== "number" || typeof height !== "number") {
      throw new Error("exportSignatureSVGFromStrokes(mode='raw') necesită width și height.");
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n${paths}\n</svg>`;
  }

  // trimmed
  const { minX, minY, width: w, height: h } = getBoundsFromStrokes(strokes, padding, strokeSize);
  if (w === 0 || h === 0) return "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(w)}" height="${Math.ceil(h)}" viewBox="0 0 ${Math.ceil(w)} ${Math.ceil(h)}">\n  <g transform="translate(${-minX}, ${-minY})">\n${paths}\n  </g>\n</svg>`;
}

/** Export PNG (raw/trimmed) din strokes — refolosibil; poți pasa un canvas existent */
export function exportSignaturePNGFromStrokes(
  strokes: Point[][],
  opts: {
    mode?: "trimmed" | "raw";
    width?: number; height?: number;           // pt "raw"
    strokeSize?: number; strokeColor?: string;
    padding?: number; background?: string;     // "transparent" pt alpha
    smoothingResolution?: number;
    dpr?: number;
    canvas?: HTMLCanvasElement;                // opțional: randăm în acest canvas
  } = {}
): string {
  const {
    mode = "trimmed",
    width,
    height,
    strokeSize = 4,
    strokeColor = "#111111",
    padding = 6,
    background = "#ffffff",
    smoothingResolution = 10,
    dpr = (typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1),
    canvas,
  } = opts;

  let off = canvas;
  if (!off) {
    if (typeof document === "undefined") throw new Error("exportSignaturePNGFromStrokes fără canvas disponibil necesită DOM (document).");
    off = document.createElement("canvas");
  }
  const ctx = off.getContext("2d")!;

  // calc dimensiuni & offset
  let drawW: number, drawH: number, ox = 0, oy = 0;
  if (mode === "raw") {
    if (typeof width !== "number" || typeof height !== "number") {
      throw new Error("exportSignaturePNGFromStrokes(mode='raw') necesită width și height.");
    }
    drawW = width; drawH = height;
  } else {
    const box = getBoundsFromStrokes(strokes, padding, strokeSize);
    if (box.width === 0 || box.height === 0) { drawW = 1; drawH = 1; }
    else { drawW = Math.ceil(box.width); drawH = Math.ceil(box.height); ox = -box.minX; oy = -box.minY; }
  }

  off.width = Math.max(1, Math.floor(drawW * dpr));
  off.height = Math.max(1, Math.floor(drawH * dpr));
  off.style.width = `${drawW}px`;
  off.style.height = `${drawH}px`;

  // @ts-ignore
  ctx.resetTransform?.();
  ctx.scale(dpr, dpr);

  if (background !== "transparent") {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, drawW, drawH);
  }

  const optsStroke = strokeOptions(strokeSize);
  for (const stroke of strokes) {
    const pts = smoothCatmullRom(stroke, smoothingResolution).map(p => [p[0] + ox, p[1] + oy]) as [number, number][];
    const outline = getStroke(pts, optsStroke);
    if (!outline.length) continue;
    ctx.beginPath();
    ctx.moveTo(outline[0][0], outline[0][1]);
    for (let i = 1; i < outline.length; i++) ctx.lineTo(outline[i][0], outline[i][1]);
    ctx.closePath();
    ctx.fillStyle = strokeColor;
    ctx.fill();
  }
  // @ts-ignore
  return off.toDataURL("image/png");
}

/* ----------------------- Componenta (randare neschimbată) ----------------------- */

export default function SignaturePad({
  className,
  height = DEFAULTS.height,
  background = DEFAULTS.background,
  strokeColor = DEFAULTS.strokeColor,
  strokeSize = DEFAULTS.strokeSize,
  padding = DEFAULTS.padding,
  onSaveSVG,
  onSavePNG,
  onChange,
  onChangeMode = DEFAULTS.onChangeMode,
  onChangeDebounceMs = DEFAULTS.onChangeDebounceMs,
  onChangeIncludePngLive = DEFAULTS.onChangeIncludePngLive,
  showSaveSvg = DEFAULTS.showSaveSvg,
  showSavePng = DEFAULTS.showSavePng
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Point[][]>([]);
  const isDrawingRef = useRef(false);

  const [version, setVersion] = useState(0);
  const bump = () => setVersion(v => v + 1);

  // --- rAF render ---
  const rafRef = useRef<number | null>(null);
  const changeRafRef = useRef<number | null>(null);
  const changeDebounceRef = useRef<number | null>(null);
  const lastEmittedSvgRef = useRef<string>(""); // comparăm SVG ca să nu spamăm

  function resizeCanvasToDPR() {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = c.getBoundingClientRect();
    const w = Math.max(1, Math.floor(width * dpr));
    const h = Math.max(1, Math.floor(height * dpr));
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; ctx.resetTransform?.(); ctx.scale(dpr, dpr); }
  }

  function scheduleRender() {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      resizeCanvasToDPR();
      renderOnce();
      emitChangeThrottled(false); // live (fără PNG implicit)
    });
  }

  function renderOnce() {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    if (background !== "transparent") {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, c.clientWidth, c.clientHeight);
    }
    const opts = strokeOptions(strokeSize);
    for (const stroke of strokesRef.current) {
      const pts = smoothCatmullRom(stroke, 10).map(p => [p[0], p[1]]) as [number, number][];
      const outline = getStroke(pts, opts); if (!outline.length) continue;
      ctx.beginPath(); ctx.moveTo(outline[0][0], outline[0][1]);
      for (let i = 1; i < outline.length; i++) ctx.lineTo(outline[i][0], outline[i][1]);
      ctx.closePath(); ctx.fillStyle = strokeColor; ctx.fill();
    }
  }

  useEffect(() => {
    const onResize = () => scheduleRender();
    window.addEventListener("resize", onResize);
    scheduleRender();
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { scheduleRender(); /* eslint-disable-next-line */ }, [version, background, strokeColor, strokeSize, padding, onChangeMode]);

  function getPos(e: React.PointerEvent) {
    const rect = canvasRef.current!.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top] as const;
  }

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const [x, y] = getPos(e);
    strokesRef.current = [...strokesRef.current, [[x, y, performance.now()]]];
    scheduleRender();
    // anulăm debounce-ul final dacă userul reîncepe să deseneze
    if (changeDebounceRef.current) { window.clearTimeout(changeDebounceRef.current); changeDebounceRef.current = null; }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDrawingRef.current) return;
    const [x, y] = getPos(e);
    const last = strokesRef.current[strokesRef.current.length - 1];
    last.push([x, y, performance.now()]);
    scheduleRender();
  }

  function onPointerUp(e: React.PointerEvent) {
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { }
    isDrawingRef.current = false;
    bump(); // finalize stroke

    // debounce final — mai emit o dată + cu PNG inclus
    if (onChange) {
      if (changeDebounceRef.current) window.clearTimeout(changeDebounceRef.current);
      changeDebounceRef.current = window.setTimeout(() => {
        emitChangeThrottled(true); // final
      }, onChangeDebounceMs);
    }
  }

  function clearAll() {
    strokesRef.current = [];
    lastEmittedSvgRef.current = "";
    bump();
    onChange?.({ svg: "", png: "", points: [] });
  }

  // --- payload + emit (folosește util-urile exportate) ---
  function buildPayload(includePng: boolean) {
    const svg = exportSignatureSVGFromStrokes(strokesRef.current, {
      mode: onChangeMode,
      strokeSize, strokeColor, padding,
      smoothingResolution: 10,
      width: canvasRef.current?.clientWidth,
      height: canvasRef.current?.clientHeight,
    });
    const png = exportSignaturePNGFromStrokes(strokesRef.current, {
      mode: onChangeMode,
      strokeSize, strokeColor, padding,
      smoothingResolution: 10,
      background,
      width: canvasRef.current?.clientWidth,
      height: canvasRef.current?.clientHeight,
    })
    const points: PointsPayload = strokesRef.current.map(s => s.map(p => [p[0], p[1], p[2]]));
    return { svg, png, points };
  }

  function emitChangeThrottled(isFinal: boolean) {
    if (!onChange) return;

    if (changeRafRef.current !== null) return;
    changeRafRef.current = requestAnimationFrame(() => {
      changeRafRef.current = null;

      const includePng = isFinal || onChangeIncludePngLive;
      const payload = buildPayload(includePng);

      if (!payload.svg) return;

      if (payload.svg !== lastEmittedSvgRef.current) {
        lastEmittedSvgRef.current = payload.svg;
        onChange(payload);
      } else if (isFinal) {
        onChange(payload);
      }
    });
  }

  // butoane Save — folosesc util-urile exportate
  function handleSaveSVG() {
    const svg = exportSignatureSVGFromStrokes(strokesRef.current, {
      mode: "trimmed",
      strokeSize, strokeColor, padding, smoothingResolution: 10,
      width: canvasRef.current?.clientWidth, height: canvasRef.current?.clientHeight,
    });
    onSaveSVG ? onSaveSVG(svg) : console.log("[Signature SVG trimmed]", svg);
  }
  function handleSavePNG() {
    const png = exportSignaturePNGFromStrokes(strokesRef.current, {
      mode: "trimmed",
      strokeSize, strokeColor, padding, smoothingResolution: 10,
      background, width: canvasRef.current?.clientWidth, height: canvasRef.current?.clientHeight,
    });
    onSavePNG ? onSavePNG(png) : console.log("[Signature PNG trimmed dataURL]", png);
  }

  return (
    <div className={className}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button className="cursor-pointer" type="button" onClick={clearAll} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb" }}>Erase</button>
        {showSaveSvg && <button className="cursor-pointer" type="button" onClick={handleSaveSVG} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #111", background: "#111", color: "#fff" }}>Save (SVG)</button>}
        {showSavePng && <button className="cursor-pointer" type="button" onClick={handleSavePNG} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e5e7eb", background: "#e5f0ff" }}>Save (PNG)</button>}
      </div>

      <div style={{ border: "1px dashed #e5e7eb", borderRadius: 12 }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height, display: "block", borderRadius: 12, touchAction: "none", cursor: "crosshair", background: background === "transparent" ? "transparent" : background }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        />
      </div>
    </div >
  );
}
