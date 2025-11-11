import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { contractId } = await req.json();

  const contractUrl = `http://localhost:3000/generate-contract?c=7ebacfbc-92a4-48a8-9363-d5020dfdb56d&pdf=true`;

  // 1️⃣ Lansează browser-ul headless
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // 2️⃣ Deschide pagina de contract
  await page.goto(contractUrl, { waitUntil: "networkidle0" });
  await page.emulateMediaType('print');

  // 3️⃣ Generează PDF-ul
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "25mm", bottom: "25mm", left: "20mm", right: "20mm" }
  });

  await browser.close();

  // 4️⃣ Urcă PDF-ul în Supabase Storage
  const supabase = await createClient()

  const filePath = `contracts/${contractId}.pdf`;
  await supabase.storage.from("contracts").upload(filePath, pdfBuffer, {
    contentType: "application/pdf",
    upsert: true,
  });

  // 5️⃣ Generează link public (sau semnat)
  const { data } = supabase.storage
    .from("contracts")
    .getPublicUrl(filePath);

  return NextResponse.json({ url: data.publicUrl });
}
