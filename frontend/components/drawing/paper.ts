// Paper.ts
import { mergeAttributes, Node } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import PaperView from "./PaperView"

const Paper = Node.create({
  name: "paper",

  group: "block",
  atom: true,

  addAttributes() {
    return {
      lines: {
        default: [],
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="paper"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "paper" })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(PaperView)
  },
})

export default Paper
