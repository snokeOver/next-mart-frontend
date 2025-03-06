"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

//get current user by decoding access token
export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else return null;
};
