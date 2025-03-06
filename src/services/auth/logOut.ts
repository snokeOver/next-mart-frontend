"use server";

import { cookies } from "next/headers";

export const logOut = async () => {
  (await cookies()).delete("accessToken");
};
