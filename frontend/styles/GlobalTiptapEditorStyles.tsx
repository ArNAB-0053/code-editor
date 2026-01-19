import { ThemeTypes } from "@/@types/theme";
import { NextFont } from "next/dist/compiled/@next/font";
import { createGlobalStyle } from "styled-components";

export const GlobalTiptapEditorStyles = createGlobalStyle<{
  $theme: ThemeTypes;
  $font: NextFont;
}>`
    .tiptap-editor {
        padding: 20px;
        border-radius: 10px;
        background: transparent !important;
        border: 1px solid ${({ $theme }) => $theme?.border15};
        font-family: ${({ $font }) => $font?.style?.fontFamily};
        border: none !important;
        height: 100% !important;
        cursor: auto !important;
    }

    .grabbable > div:nth-child(2) {
        height: 90% !important;
    }

    .ProseMirror {
        outline: none !important;
    }

    .button-group {
        background: ${({ $theme }) => $theme?.border20} !important;
        border-radius: 5px !important;

        button:hover {
            transform: scale(1.05);
            background: ${({ $theme }) => $theme?.border20} !important;
        }

        button:active {
            transform: scale(0.95);
        }
    }

    .grabbable {
        cursor: move; /* fallback if grab cursor is unsupported */
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }

    /* (Optional) Apply a "closed-hand" cursor during drag operation. */
    .grabbable:active {
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
    }
   
`;
