import { WebsiteFontsKey } from "@/@types/font";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CButton, CDivider } from "../ui/custom";
import {
  MdDeleteForever,
  MdDriveFileRenameOutline,
  MdRestore,
} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "antd";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { Eye } from "lucide-react";
import { appUrls } from "@/config/navigation.config";
import { useRestore, useSoftDelete } from "@/services/files";
import { selectedUserId } from "@/redux/slices/userSlice";
import { ISoftDeleteRequest } from "@/@types/files";
import { toast } from "sonner";
import { AModal } from "../ui/antd";
import styled from "styled-components";

const StyledAModal = styled(AModal)`
  .ant-modal-content {
    padding: 0 !important;
  }
`;

interface ThreeDotDropdownProps {
  fileId: string;
  isTrash?: boolean;
  fileName?: string;
}

const ThreeDotDropdown = ({
  fileId,
  isTrash = false,
  fileName,
}: ThreeDotDropdownProps) => {
  const userId = useSelector(selectedUserId);
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const [open, setOpen] = useState(false);

  const { mutateAsync: moveToTrash } = useSoftDelete();
  const { mutateAsync: restore } = useRestore();

  const payload: ISoftDeleteRequest = {
    OwnerId: userId,
    FileId: fileId,
  };

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
                      <Link
                        href={`${appUrls.FILE}/${fileId}`}
                        className="w-full"
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
                        href={`${appUrls.FILE}/${fileId}`}
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
                      </Link>

                      <CDivider className="mt-1! mb-1!" />

                      <CButton
                        className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
                        variant="transparent"
                        hoverBgColor={`${theme.border15}`}
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
                          const toastId = toast.loading("Moving to Trash");
                          moveToTrash(payload, {
                            onSuccess: () =>
                              toast.success("Moved to Trash", { id: toastId }),
                            onError: () =>
                              toast.error("Something went Wrong", {
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
        overlayStyle={{
          backgroundColor: `${theme.border10}`,
        }}
      >
        <button className="p-1.5 hover:bg-white/5 rounded-full cursor-pointer">
          <BsThreeDotsVertical
            size={14}
            style={{
              color: theme.textColor,
            }}
          />
        </button>
      </Dropdown>

      <StyledAModal
        title={null}
        open={open}
        closeIcon={null}
        onCancel={() => setOpen(false)}
        footer={null}
        className="overflow-hidden! md:w-[25rem]! "
        useSideIndicator={false}
        centered
      >
        <div className="flex justify-center flex-col w-full px-5 py-3 ">
          <h1 className=" font-semibold text-lg">
            Permanently delete this file?
          </h1>
          <span className=" my-4 text-sm opacity-80">
            This action will permanently delete <b>{fileName}</b>.
            You won’t be able to recover it later.
          </span>

          <div className="flex items-center justify-end gap-x-3 mt-2">
            <CButton
              className="flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
              variant="transparent"
              hoverBgColor={`${theme.border15}`}
              onClick={() => setOpen(false)}
            >
              <div className=" flex! items-center! justify-start! gap-x-3! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
                {/* <MdDriveFileRenameOutline size={18} /> */}
                Cancel
              </div>
            </CButton>

            <CButton
              className=" flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
              // variant="transparent"
              type="danger"
            >
              <div className=" flex! items-center! justify-start! gap-x-3! px-4.5 py-1.5 hover:opacity-80 w-full font-semibold transition-all duration-200 ease-linear">
                <MdDeleteForever size={18} />
                Delete
              </div>
            </CButton>
          </div>
        </div>
      </StyledAModal>
    </>
  );
};

export default ThreeDotDropdown;
