import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CButton, CDivider } from "@/components/ui/custom";
import {
  MdDeleteForever,
  MdDriveFileRenameOutline,
  MdRestore,
} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "antd";
import { FaExternalLinkAlt, FaFolderOpen } from "react-icons/fa";
import Link from "next/link";
import { Eye } from "lucide-react";
import { appUrls } from "@/config/navigation.config";
import {
  ISoftDeleteParams,
  useParentId,
  useRestore,
  useSoftDelete,
} from "@/services/files";
import { selectedUserId } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setFolderId } from "@/redux/slices/fileFolderSlice";
import { ConfirmDeleteModal, RenameModal } from "@/components/modals/three-dot";
import { setCreatedFileIdRedux } from "@/redux/slices/createdFilesEditorSlice";
import { messagesConfig } from "@/config/messages.config";

interface ThreeDotDropdownProps {
  fileId: string;
  isTrash?: boolean;
  fileName?: string;
  lang?: string;
  isFile?: boolean;
}

export const ThreeDotDropdown = ({
  fileId,
  isTrash = false,
  fileName,
  isFile = false,
  lang,
}: ThreeDotDropdownProps) => {
  const userId = useSelector(selectedUserId);
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const [open, setOpen] = useState(false);
  const [openRename, setOpenRename] = useState(false);

  const [renameFile, setRenameFile] = useState("");

  useEffect(() => {
    setRenameFile(fileName!);
  }, [fileName]);

  const { mutateAsync: moveToTrash } = useSoftDelete();
  const { mutateAsync: restore } = useRestore();

  const { data: parent } = useParentId(fileId);

  const payload: ISoftDeleteParams = {
    OwnerId: userId,
    FileId: fileId,
    ParentId: parent?.data as string,
  };

  const dispatch = useDispatch();

  return (
    <>
      <Dropdown
        trigger={["click"]}
        menu={{
          items: [
            {
              key: 1,
              label: (
                <div
                  className="flex items-center justify-center flex-col py-2! w-fit min-w-[14rem] overflow-hidden"
                  style={{
                    backgroundColor: theme.border5,
                  }}
                >
                  {isTrash ? (
                    <>
                      <CButton
                        className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
                        variant="transparent"
                        hoverBgColor={`${theme.border15}`}
                        onClick={() => {
                          const toastId = toast.loading("Removing from Trash");
                          restore(payload, {
                            onSuccess: () =>
                              toast.success("Removed from Trash", {
                                id: toastId,
                              }),
                            onError: () =>
                              toast.error("Something went Wrong", {
                                id: toastId,
                              }),
                          });
                        }}
                      >
                        <div className=" flex! items-center! justify-start! gap-x-3! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
                          <MdRestore size={18} />
                          Restore
                        </div>
                      </CButton>
                      <CDivider className="mt-1! mb-1!" />

                      <CButton
                        className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
                        variant="transparent"
                        hoverBgColor={`${theme.border15}`}
                        onClick={() => setOpen(true)}
                      >
                        <div className=" flex! items-center! justify-start! gap-x-3! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
                          <MdDeleteForever size={18} />
                          Delete Permanently
                        </div>
                      </CButton>
                    </>
                  ) : (
                    <>
                      {isFile ? (
                        <>
                          <Link
                            href={`${appUrls.CODE}/${fileId}`}
                            className="w-full"
                            onClick={() =>
                              dispatch(setCreatedFileIdRedux(fileId))
                            }
                          >
                            <CButton
                              className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
                              variant="transparent"
                              hoverBgColor={`${theme.border15}`}
                            >
                              <div className=" flex! items-center! justify-start! gap-x-3! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
                                <Eye size={16} className="" />
                                Preview
                              </div>
                            </CButton>
                          </Link>
                          <Link
                            href={`${appUrls.CODE}/${fileId}`}
                            target="_blank"
                            className="w-full"
                          >
                            <CButton
                              className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
                              variant="transparent"
                              hoverBgColor={`${theme.border15}`}
                            >
                              <div className=" flex! items-center! justify-start! gap-x-3.5! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
                                <FaExternalLinkAlt className="translate-x-0.5" />
                                Open in new tab
                              </div>
                            </CButton>
                          </Link>
                        </>
                      ) : (
                        <div
                          onClick={() => {
                            dispatch(setFolderId(fileId));
                          }}
                          className="w-full"
                        >
                          <CButton
                            className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
                            variant="transparent"
                            hoverBgColor={`${theme.border15}`}
                          >
                            <div className=" flex! items-center! justify-start! gap-x-3.5! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
                              <FaFolderOpen
                                size={16}
                                className="translate-x-0.5"
                              />
                              Open
                            </div>
                          </CButton>
                        </div>
                      )}

                      {/* <Link
                        href={undefined}
                        onClick={() => {
                          dispatch(setFolderId(fileId));
                        }}
                        target="_blank"
                        className="w-full"
                      >
                        <CButton
                          className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
                          variant="transparent"
                          hoverBgColor={`${theme.border15}`}
                        >
                          <div className=" flex! items-center! justify-start! gap-x-3! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
                            <FaExternalLinkAlt className="translate-x-0.5" />
                            Open in new tab
                          </div>
                        </CButton>
                      </Link> */}

                      <CDivider className="mt-1! mb-1!" />

                      <CButton
                        className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
                        variant="transparent"
                        hoverBgColor={`${theme.border15}`}
                        onClick={() => setOpenRename(true)}
                      >
                        <div className=" flex! items-center! justify-start! gap-x-3! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
                          <MdDriveFileRenameOutline size={18} />
                          Rename
                        </div>
                      </CButton>

                      <CDivider className="mt-1! mb-1!" />

                      <CButton
                        className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
                        variant="transparent"
                        hoverBgColor={`${theme.border15}`}
                        onClick={() => {
                          const toastId = toast.loading(
                            messagesConfig.TRASH.LOADING,
                          );
                          moveToTrash(payload, {
                            onSuccess: () =>
                              toast.success(messagesConfig.TRASH.SUCCESS, {
                                id: toastId,
                              }),
                            onError: () =>
                              toast.error(messagesConfig.TRASH.ERROR, {
                                id: toastId,
                              }),
                          });
                        }}
                      >
                        <div className=" flex! items-center! justify-start! gap-x-3! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
                          <MdDeleteForever size={18} />
                          Move to Trash
                        </div>
                      </CButton>
                    </>
                  )}

                  {/* <CButton
                    className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! p-0! hover:opacity-80! transition-all ease-linear duration-200 bg-[#ff000050]! text-[#ff0000]! hover:text-white! hover:bg-[#ff0000]!"
                    onClick={() => setOpen(true)}
                  >
                    <div className=" flex! items-center! justify-start! gap-x-3! pl-5 pr-6 py-1.5 hover:opacity-100 w-full font-semibold">
                      <MdDeleteForever size={18} />
                      <span className="translate-x-0.5">Move to Trash</span>
                    </div>
                  </CButton> */}
                </div>
              ),
            },
          ],
        }}
        className="cursor-pointer "
        rootClassName=" backdrop-blur-xl rounded-xl p-0! "
        styles={{
          root: {
            backgroundColor: `${theme.border10}`,
          },
        }}
      >
        <div className="p-1.5 hover:bg-white/5 rounded-full cursor-pointer">
          <BsThreeDotsVertical
            size={14}
            style={{
              color: theme.textColor,
            }}
          />
        </div>
      </Dropdown>

      <ConfirmDeleteModal
        fileName={fileName as string}
        open={open}
        setOpen={setOpen}
      />

      <RenameModal
        fileId={fileId}
        openRename={openRename}
        setOpenRename={setOpenRename}
        renameFile={renameFile}
        setRenameFile={setRenameFile}
        isFile={isFile}
        lang={lang}
      />
    </>
  );
};
