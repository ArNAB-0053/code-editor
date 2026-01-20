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
import { useEffect, useState } from "react";

const TiptapEditor = ({ setOpen }: { setOpen: SetterFunctionTypesBool }) => {
  const params = useParams();
  const reduxFileId = useSelector(selectedfileId);

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

    const compressed = compressToUTF16(
      JSON.stringify(editor.getJSON())
    );

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
      <NotesHeader editor={editor as Editor} setOpen={setOpen} />
      <div className="overflow-y-auto custom-scrollbar relative">
        <EditorContent editor={editor} />
        <button
          onClick={handleSave}
          className="mt-4 absolute right-0 top-0 px-3 py-2 text-xs bg-black"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default TiptapEditor;
