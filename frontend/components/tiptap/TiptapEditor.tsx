"use client";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "@/styles/editor.css";
import NotesHeader from "./notes-header";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { useNoteCreation, useNoteDetails } from "@/services/notes";
import { IGetNoteDetailsRequest, INoteModel } from "@/@types/notes";
import { useParams } from "next/navigation";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { useSelector } from "react-redux";
import { selectedfileId } from "@/redux/slices/createdFilesEditorSlice";
import { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";

const TiptapEditor = ({
  setOpen,
  width,
}: {
  setOpen: SetterFunctionTypesBool;
  width?: number;
}) => {
  const params = useParams();
  const reduxFileId = useSelector(selectedfileId);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  // console.log({
  //   reduxFileId: reduxFileId,
  //   "params?.fileId": params?.fileId,
  //   "params?.fileId === reduxFileId": params?.fileId === reduxFileId,
  // });

  const fileId = (params?.fileId ?? reduxFileId) as string;

  const get_payload: IGetNoteDetailsRequest = {
    CodeId: fileId as string,
  };
  const { data: notes } = useNoteDetails(get_payload);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  useEffect(() => {
    if (!editor || !notes?.data?.content) return;
    const decompressed = decompressFromUTF16(notes.data.content);
    if (!decompressed) return;
    try {
      const json = JSON.parse(decompressed);
      editor.commands.setContent(json);
    } catch (err) {
      console.error("Failed to load note:", err);
    }
  }, [editor, notes?.data?.content]);

  const { mutate: createNote } = useNoteCreation();

  const handleSave = () => {
    if (!editor) return;
    const compressed = compressToUTF16(JSON.stringify(editor.getJSON()));
    const payload: INoteModel = {
      CodeId: fileId,
      Content: compressed,
    };
    createNote(payload, {
      onSuccess: (res) => console.log("Saved:", res),
      onError: (err) => console.error("Save error:", err),
    });
  };

  return (
    <>
      <NotesHeader width={width} editor={editor as Editor} setOpen={setOpen} />
      <div className="pt-2 pb-2 rounded-md bg-[#2c2c2c]/50 relative">
        <div className="overflow-y-auto custom-scrollbar relative h-full editorContent">
          <EditorContent editor={editor} />
          <button
            onClick={handleSave}
            className="mt-4 absolute right-0 top-0 px-3 py-2 text-xs "
          >
            Save
          </button>
        </div>

        <span className="absolute -right-2 -bottom-2">
          <IoIosArrowForward
            className="rotate-45"
            size={21}
            strokeWidth={5}
            color={theme.activeColor}
            opacity={0.8}
          />
        </span>
      </div>
    </>
  );
};

export default TiptapEditor;
