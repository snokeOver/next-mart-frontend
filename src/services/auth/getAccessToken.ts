"use server";

import { cookies } from "next/headers";

export const getAccessToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refreshToken")!.value,
        },
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
