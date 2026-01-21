"use client";

import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { IModalProps } from "@/@types/_base";

import "react-resizable/css/styles.css";

import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { Resizable } from "react-resizable";
import { TiptapEditor } from "@/components/tiptap";

const DraggableComponent = () => {
  const [open, setOpen] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const handleResize = (e, { size }) => {
    console.log("New size:", size);
  };

  return (
    <>
      <button className="" onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <Draggable
        nodeRef={nodeRef}
        defaultPosition={{ x: 0, y: 0 }}
        cancel=".tiptap-editor, .ProseMirror"
      >
        <Resizable
          width={400}
          height={300}
          onResize={handleResize}
          enable={{
            top: false,
            right: true,
            bottom: true,
            left: false,
            topRight: false,
            bottomRight: true,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <div
            ref={nodeRef}
            style={{
              position: "fixed",
              top: "10%",
              left: "20%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              borderColor: theme.border10,
            }}
            className={cn(
              "rounded-xl h-8/10 w-[60rem] overflow-hidden custom-scrollbar bg-[#2c2c2c]/50 backdrop-blur-2xl border-2 grabbable",
              open ? "" : "hidden",
            )}
          >
            <TiptapEditor setOpen={setOpen} />
          </div>
        </Resizable>
      </Draggable>
    </>
  );
};

export default DraggableComponent;
