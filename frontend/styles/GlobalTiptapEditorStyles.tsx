import { ThemeTypes } from "@/@types/theme";
import { NextFont } from "next/dist/compiled/@next/font";
import { createGlobalStyle } from "styled-components";

export const GlobalTiptapEditorStyles = createGlobalStyle<{
  $theme: ThemeTypes;
  $font: NextFont;
}>`
  .react-resizable-handle {
    opacity: 0 !important;
  }

  .override-aselect-option-bg {
    background-color: ${({ $theme }) => $theme.border10} !important;

    .ant-select-dropdown, .ant-select-item {
      padding: 0 !important;
    }
  }

  .override-aselect-bg {
      width: 122px !important;
      background-color: transparent !important;
      border-color: transparent !important;
  }

  .editorContent > div:nth-child(1) {
      height: 100% !important;
  }

    .tiptap-editor {
        padding: 20px;
        border-radius: 16px;
        background: transparent !important;
        border: 1px solid ${({ $theme }) => $theme?.border15};
        font-family: ${({ $font }) => $font?.style?.fontFamily};
        border: none !important;
        height: 100% !important;
        cursor: auto !important;
    }

    .grabbable > div:nth-child(2) {
        height: calc(100% - 42px) !important;
    }

    .ProseMirror {
        outline: none !important;
    }

    .button-group {
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
   
    .tiptap {
      :first-child {
        margin-top: 0;
      }

      /* List styles */
      ul,
      ol {
        padding: 0 1rem;
        margin: 1.25rem 1rem 1.25rem 0.4rem;
        list-style: disc !important;

        li p {
          margin-top: 0.25em;
          margin-bottom: 0.25em;
        }
      }

      ol {
        list-style: decimal !important;
      }

      ul {
        list-style: disc !important;
      }

      p {
        line-height: 1.1rem;
        font-size: 14px;
      }

      /* Heading styles */
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        line-height: 1.1;
        margin-top: 1rem;
        text-wrap: pretty;
      }

      h1,
      h2 {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }

      h1 {
        font-size: 1.6rem;
      }

      h2 {
        font-size: 1.4rem;
      }

      h3 {
        font-size: 1.3rem;
      }

      h4 {
        font-size: 1.2rem;
      }

      h5 {
        font-size: 1.1rem;
      }

      h6 {
        font-size: 1rem;
      }

      pre {
        background: ${({ $theme }) => $theme?.border15} !important;
        border-radius: 0.5rem;
        color: ${({ $theme }) => $theme?.textColor} !important;
        font-family: 'JetBrainsMono', monospace;
        margin: 1.5rem 0;
        padding: 0.75rem 1rem;

        code {
          background: none;
          color: inherit;
          font-size: 0.8rem;
          padding: 0;
        }
      }

      blockquote {
        border-left: ${({ $theme }) => `3px solid  ${$theme?.border20}`} !important;
        color: ${({ $theme }) => $theme?.disabledTextColor} !important;
        margin: 1.5rem 0;
        padding-left: 1rem;
        font-style: italic !important;
      }

      hr {
        border: none;
        border-top: ${({ $theme }) => `3px solid  ${$theme?.activeColor}`} !important;
        margin: 2rem 0;
      } 
    }
`;
