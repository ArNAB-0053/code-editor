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

const DraggableComponent = ({ open, setOpen }: IModalProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const [size, setSize] = useState({ width: 830, height: 500 });

  const handleResize = (_, { size }) => {
    setSize(size);
  };

  return (
    <>
      <Draggable
        nodeRef={nodeRef}
        defaultPosition={{ x: 0, y: 0 }}
        cancel=".tiptap-editor, .ProseMirror, .react-resizable-handle "
      >
        <Resizable
          height={size.height}
          width={size.width}
          minConstraints={[500, 400]}
          onResize={handleResize}
          resizeHandles={["se"]}
        >
          <div
            ref={nodeRef}
            style={{
              position: "fixed",
              top: "10%",
              left: "20%",
              zIndex: 1001,
              borderColor: theme.border10,
              height: size.height,
              width: size.width,
              backgroundColor: theme.border5
            }}
            className={cn(
              "rounded-md custom-scrollbar backdrop-blur-2xl border-4 grabbable",
              open ? "" : "hidden",
            )}
          >
            <TiptapEditor width={size.width} setOpen={setOpen} />
          </div>
        </Resizable>
      </Draggable>
    </>
  );
};

export default DraggableComponent;
