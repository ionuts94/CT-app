// import { envs } from "@/constants/envs";
// import { createClient } from "@/lib/supabase/server";
// import puppeteer from "puppeteer";

// export async function generatePdf({ contractId }: { contractId: string }) {
//   const contractUrl = envs.NEXT_PUBLIC_URL + '/generate-contract?c=' + contractId
//   const browser = await puppeteer.launch({
//     headless: true,
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });

//   const page = await browser.newPage();

//   await page.goto(contractUrl, { waitUntil: "networkidle0" });
//   await page.emulateMediaType('print');

//   const pdfBuffer = await page.pdf({
//     format: "A4",
//     printBackground: true,
//     preferCSSPageSize: true,
//     margin: { top: "25mm", bottom: "25mm", left: "20mm", right: "20mm" }
//   });

//   await browser.close();

//   const supabase = await createClient()

//   const filePath = `contracts/${contractId}.pdf`;
//   await supabase.storage.from("contracts").upload(filePath, pdfBuffer, {
//     contentType: "application/pdf",
//     upsert: true,
//   });

//   const { data } = supabase.storage
//     .from("contracts")
//     .getPublicUrl(filePath);

//   return {
//     contractPdfUrl: data.publicUrl
//   }
// }