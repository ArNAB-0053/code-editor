"use client";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "@/styles/editor.css";
import NotesHeader from "./notes-header";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { useNoteDetails } from "@/services/notes";
import { IGetNoteDetailsRequest, INoteModel } from "@/@types/notes";
import { useParams } from "next/navigation";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { useSelector } from "react-redux";
import { selectedfileId } from "@/redux/slices/createdFilesEditorSlice";
import { useEffect, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { useNote } from "@/hooks/useNote";
import { useDispatch } from "react-redux";
import { setNotesContent, setNotesTitle } from "@/redux/slices/notesSlice";
import TitleHeader from "./title-header";

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

  const lastSavedRef = useRef<string | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useDispatch();

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

    dispatch(setNotesContent({ fileId: fileId, content: notes?.data?.content }));
    dispatch(
      setNotesTitle({ fileId: fileId, title: notes?.data?.title as string }),
    );
    const decompressed = decompressFromUTF16(notes.data.content);
    if (!decompressed) return;

    try {
      const json = JSON.parse(decompressed);
      editor.commands.setContent(json);

      lastSavedRef.current = JSON.stringify(json);
    } catch (err) {
      console.error("Failed to load note:", err);
    }
  }, [editor, notes?.data?.content, dispatch, fileId, notes?.data?.title]);

  // hook to save note
  const { addNote: createNote } = useNote();

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const currentJSON = JSON.stringify(editor.getJSON());

      if (currentJSON === lastSavedRef.current) return;

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        const compressed = compressToUTF16(currentJSON);

        const payload: INoteModel = {
          CodeId: fileId,
          Content: compressed,
        };

        dispatch(setNotesContent({ fileId: fileId, content: currentJSON }));
        createNote(payload);
        lastSavedRef.current = currentJSON;
      }, 1000); // 1 second after last change
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [editor, fileId, createNote, dispatch]);

  return (
    <>
      <div>
        <TitleHeader setOpen={setOpen} />
        <NotesHeader
          width={width}
          editor={editor as Editor}
        />
      </div>
      <div className="rounded-md bg-[#2c2c2c]/50 relative">
        <div className="overflow-y-auto custom-scrollbar relative h-full editorContent">
          <EditorContent editor={editor} />
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
