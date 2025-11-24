import Cookies from "js-cookie";

export const setCookies = (
  name: string,
  expires: number,
  sameSite: "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | undefined,
  value: string
) => {
  Cookies.set(name, value, {
    expires: expires,
    sameSite: sameSite,
  });
};

export const getCookies = (name: string) => {
    return Cookies.get(name);
}