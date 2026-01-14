import { FileTypeEnum } from "@/@types/_enums";
import z from "zod";

export const filesSchema = z.object({
  OwnerId: z.string(),
  FileName: z.string(),
  FileType: z.nativeEnum(FileTypeEnum),
  Lang: z.string().optional(),
  ParentId: z.string().optional().nullable(),
});

export type CreateFilesFormType = z.infer<typeof filesSchema>;