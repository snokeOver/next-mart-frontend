"use server";

import { cookies } from "next/headers";

export const createShop = async (data: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/shop`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
