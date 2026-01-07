import { langs } from "@/constants/lang";

export function getExtention(lang: string) {
    const ext = langs[lang!]?.ext
    return ext;
}