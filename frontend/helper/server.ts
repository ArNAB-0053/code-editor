"use server"
import { cookies } from "next/headers";

export const getCookiesServer = async (value: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(value);
  return cookie?.value;
};