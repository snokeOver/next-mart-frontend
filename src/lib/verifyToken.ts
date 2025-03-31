"use server";

import { getAccessToken } from "@/services/auth/getAccessToken";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    console.log(error);
    return true;
  }
};

export const getValidToken = async (): Promise<string> => {
  const cookie = await cookies();
  let token = cookie.get("accessToken")!.value;

  if (!token || (await isTokenExpired(token))) {
    const { data } = await getAccessToken();
    token = data.accessToken;
    (await cookies()).set("accessToken", token);
  }

  return token;
};
