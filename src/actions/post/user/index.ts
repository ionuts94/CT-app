
import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { User } from "@prisma/client";
import { GetAuthUser } from "../auth";


export async function CreateUserRecord({
  id,
  email,
  firstName,
  lastName,
}: Partial<User>): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("users").insert({
      id,
      email,
      firstName,
      lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    if (error) throw (error.message)

    return {
      status: Status.SUCCESS,
      data: ""
    };
  } catch (err: any) {
    const errMessage = `Cannot create user record. Error: ${err.message}`;
    console.log(errMessage);
    return {
      status: Status.FAILED,
      error: errMessage
    };
  }
}


export async function UpdateCompanyIdForAuthUser({
  companyId,
}: {
  companyId: string
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { data: authUser, error: authUserError } = await GetAuthUser()

    if (!authUser) throw Error("Could not retrieve authenticated user")

    const { error } = await supabase.from("users")
      .update({ currentCompanyId: companyId })
      .eq("id", authUser.id)

    if (error) throw Error(error.message)

    return {
      status: Status.SUCCESS,
      data: ""
    };
  } catch (err: any) {
    const errMessage = `Could not update user company id. Error: ${err.message}`;
    console.log(errMessage);
    return {
      status: Status.FAILED,
      error: errMessage
    };
  }
}