"use server"
import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import html2pdf from "html2pdf.js"


export async function GeneratePDFForContract({
  contractId
}: {
  contractId: string
}): Promise<CustomApiResponse> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("contracts").select("*").eq("id", contractId).maybeSingle()
    console.log(data)

    await html2pdf(data.content)

    return {
      status: Status.SUCCESS,
      data: ""
    };
  } catch (err: any) {
    const errMessage = `${err.message}`;
    console.log(errMessage);
    return {
      status: Status.FAILED,
      error: errMessage
    };
  }
}