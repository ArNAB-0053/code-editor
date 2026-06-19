"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import Document from "@tiptap/extension-document"
import Text from "@tiptap/extension-text"
import Paper from "./paper"

const DrawingEditor = () => {
  const editor = useEditor({
    extensions: [
      Document.extend({ content: "paper" }),
      Text,
      Paper,
    ],
    immediatelyRender: false,
    content: {
      type: "doc",
      content: [{ type: "paper" }],
    },
  })

  return <EditorContent editor={editor} />
}

export default DrawingEditor
