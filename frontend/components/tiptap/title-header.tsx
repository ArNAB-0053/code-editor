import { selectedfileId } from "@/redux/slices/createdFilesEditorSlice";
import { selectedNote } from "@/redux/slices/notesSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AInput } from "../ui/antd";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { FaCheck } from "react-icons/fa";
import { X } from "lucide-react";
import { useNote } from "@/hooks/useNote";
import { IRenameNoteRequest } from "@/@types/notes";
import { transitionString } from "@/styles";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { cn } from "@/lib/utils";
import { NotesIcon } from "@/assets/NotesIcon";

const TitleHeader = ({ setOpen }: { setOpen: SetterFunctionTypesBool }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [title, setTitle] = useState("");

  const currentNote = useSelector(selectedNote);
  const fileId = useSelector(selectedfileId);
  const noteTitle = currentNote[fileId]?.title;

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  useEffect(() => {
    setTitle(noteTitle);
  }, [noteTitle]);

  const { renameNote } = useNote();

  const payload: IRenameNoteRequest = {
    CodeId: fileId,
    Title: title,
  };

  const handleNewNameSubmit = () => {
    // console.log(payload);
    renameNote(payload);
    setIsRenaming(false);
  };

  return (
    <div className="font-semibold group flex items-center justify-between p-2">
      <div className="flex items-center gap-x-2">
        <span
          className="p-1 rounded-md"
          style={{
            backgroundColor: theme.border20,
            color: theme.activeColor,
          }}
        >
          <NotesIcon size={16} />
        </span>
        <div className=" relative flex items-center justify-start max-w-[200px] w-fit gap-x-1">
          {isRenaming ? (
            <>
              <AInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!isRenaming}
                className="border-none! outline-none! focus:ring-0! p-0! bg-transparent! truncate! "
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleNewNameSubmit();
                  }

                  if (e.key === "Escape") {
                    setTitle(noteTitle);
                    setIsRenaming(false);
                  }
                }}
              />
              <button
                className="w-6 px-1.5 py-1 rounded-md cursor-pointer hover:opacity-100 opacity-80 transition-all duration-200 ease-linear ml-2 "
                style={{
                  backgroundColor: theme.border20,
                }}
                onClick={handleNewNameSubmit}
              >
                <FaCheck size={13} className="opacity-90" />
              </button>
              <button
                className="w-6 px-1.5 py-1 rounded-md cursor-pointer hover:opacity-100 opacity-80 transition-all duration-200 ease-linear "
                style={{
                  backgroundColor: theme.border20,
                }}
                onClick={() => {
                  setTitle(noteTitle);
                  setIsRenaming(false);
                }}
              >
                <X size={13} className="opacity-90" />
              </button>
            </>
          ) : (
            <>
              <p>{noteTitle}</p>
              <button
                onClick={() => {
                  setIsRenaming(true);
                }}
                className="p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-linear cursor-pointer rounded-md ml-2"
                style={{
                  backgroundColor: theme.border15,
                }}
              >
                <MdDriveFileRenameOutline />
              </button>
            </>
          )}
        </div>
      </div>
      <button
        className={cn(
          "opacity-90 cursor-pointer hover:text-white hover:bg-white/20! p-1 rounded-sm flex items-center justify-center ",
          transitionString,
        )}
        onClick={() => setOpen(false)}
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default TitleHeader;
