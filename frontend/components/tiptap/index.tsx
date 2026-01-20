"use client";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./menu-bar";
import "@/styles/editor.css";
import NotesHeader from "./notes-header";
import { SetterFunctionTypesBool } from "@/@types/_base";

const TiptapEditor = ({ setOpen }: { setOpen: SetterFunctionTypesBool }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: `
      <h3 style="text-align:left">
        Devs Just Want to Have Fun by Cyndi Lauper
      </h3>
      <p style="text-align:left">
        I come home in the morning light<br>
        My mother says, <mark>“When you gonna live your life right?”</mark><br>
        Oh mother dear we’re not the fortunate ones<br>
        And devs, they wanna have fun<br>
        Oh devs just want to have fun</p>
      <p style="text-align:left">
        The phone rings in the middle of the night<br>
        My father yells, "What you gonna do with your life?"<br>
        Oh daddy dear, you know you’re still number one<br>
        But <s>girls</s>devs, they wanna have fun<br>
        Oh devs just want to have
      </p>
      <p style="text-align:left">
        That’s all they really want<br>
        Some fun<br>
        When the working day is done<br>
        Oh devs, they wanna have fun<br>
        Oh devs just wanna have fun<br>
        (devs, they wanna, wanna have fun, devs wanna have)
      </p>
    `,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  return (
    <>
      <NotesHeader editor={editor as Editor} setOpen={setOpen} />
      <div className="overflow-y-auto custom-scrollbar">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default TiptapEditor;
