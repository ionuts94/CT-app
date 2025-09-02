import { Company, User } from "@prisma/client";

export type UserWithRole = ({
  role: {
    id: number;
    value: string;
  };
} & User) | null

export type T_UserProfile = {
  first_name: string,
  last_name: string,
  email: string,
  jobTitle: string,
  country: string
}

export type T_UserWithCompany = User & {
  company: Company
}
