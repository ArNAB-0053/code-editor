"use client";

import { useRef, useState } from "react";
import Draggable from "react-draggable";
import TiptapEditorModal from "../modals/tiptap";
import { IModalProps } from "@/@types/_base";
import TiptapEditor from "../tiptap";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";

const DraggableComponent = ({ open, setOpen }: IModalProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: 0, y: 0 }}
      cancel=".tiptap-editor, .ProseMirror"
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
          "rounded-xl h-8/10 w-[60rem] overflow-y-auto custom-scrollbar bg-[#2c2c2c]/50 backdrop-blur-2xl border-2 grabbable",
          open ? "" : "hidden",
        )}
      >
        <TiptapEditor setOpen={setOpen} />
      </div>
    </Draggable>
  );
};

export default DraggableComponent;
