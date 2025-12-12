import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { appUrls } from "@/config/navigation.config";
import { selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { LuLoader } from "react-icons/lu";
import { Dropdown } from "antd";
import { MODAL_HEIGHT } from "@/components/ui";
import { AButton, AInput, AModal } from "@/components/ui/antd";
import { CopyButton } from "@/components/editor/header-buttons";
import { useCreateShare } from "@/services/share";
import { selectedEditorId } from "@/redux/slices/editorSlice";
// import { selectedUserId } from "@/redux/slices/userSlice";
import { ThemeTypes } from "@/@types/theme";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { IShareDataModel, IShareRequest } from "@/@types/share";
import { _VisibilityEnum } from "@/@types/_enums";
import SearchUsername from "./search";
import { GlobalStyles } from "@/styles/customStyledCss";
import DropdownMenu, { ISPUBLIC_CONFIG } from "./dropdown-menu";
import { IoChevronDownOutline } from "react-icons/io5";
import {
  selectedUserEmail,
  selectedUserId,
  selectedUserName,
  selectedUserUsername,
} from "@/redux/slices/userSlice";

const ShareModal = ({
  theme,
  setOpen,
  open,
}: {
  theme: ThemeTypes;
  setOpen: SetterFunctionTypesBool;
  open: boolean;
}) => {
  const [sharingDetails, setSharingDetails] = useState<IShareDataModel>();
  const [isSharingLoading, setIsSharingLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  // const [unlock, setUnlock] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [searchItems, setSearchItems] = useState<string[]>([]);

  const websiteFont = useSelector(selectWebsiteFont);
  const editorId = useSelector(selectedEditorId);
  const userId = useSelector(selectedUserId);
  const nameObj = useSelector(selectedUserName);
  const email = useSelector(selectedUserEmail);
  const username = useSelector(selectedUserUsername);

  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const { mutateAsync: createShare } = useCreateShare();

  console.log("searchItem => ", searchItems);

  useEffect(() => {
    setTimeout(() => {
      setLinkCopied(false);
    }, 1000);
  }, [linkCopied]);

  const OwnerDetails = {
    UserId: userId,
    Username: username,
    Name: nameObj,
    Email: email,
  };

  const payload: IShareRequest = {
    EditorId: editorId,
    AllowedUsers: searchItems ?? [],
    Visibility: isPublic ? _VisibilityEnum.Public : _VisibilityEnum.Private,
    OwnerDetails: OwnerDetails,
  };

  useEffect(() => {
    console.log("____ =>  isPublic", isPublic);
  }, [isPublic]);

  const handleGenerateSafeShare = async () => {
    setIsSharingLoading(true);

    try {
      const res = await createShare(payload);
      console.log("____ => ", payload, "\n", "shared", res);
      setSharingDetails(res?.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSharingLoading(false);
    }
  };
  // const generatedLink =
  //   shareMode === "snapshot"
  //     ? `http://localhost:3000${appUrls.SHARE}/${sharingDetails?.sharedId}?mode=snapshot`
  //     : `http://localhost:3000${appUrls.SHARE}/${editorId}?mode=live`;

  const snapshotLink =
    sharingDetails?.sharedId &&
    `http://localhost:3000${appUrls.SHARE}/${sharingDetails?.sharedId}`;
  const liveLink = `http://localhost:3000${appUrls.SHARE}/${editorId}`;

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      setLinkCopied(true);
    });
  };
  return (
    <>
      <GlobalStyles $theme={theme} $isChecked={!isPublic} />
      <AModal
        title="Share Your Code"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        className="overflow-hidden "
        confirmLoading={isSharingLoading}
      >
        <div
          style={{ height: MODAL_HEIGHT, width: "calc(100% + 20px)" }}
          className="overflow-y-auto custom-scrollbar pr-5 mt-7"
        >
          {/* LIVE SHARE SECTION */}
          <div
            className="mb-4 pb-4 border-b "
            style={{
              borderColor: theme.border10,
            }}
          >
            <h3 className="font-semibold text-base mb-1">Live Share</h3>
            <p className="text-xs opacity-70 mb-3">
              Anyone with this link will always see the latest version of your
              code. No snapshot needed.
            </p>

            <div className="flex items-center gap-3">
              <AInput
                value={liveLink}
                disabled
                className="h-8.5! opacity-65! text-xs!"
              />
              <CopyButton
                onClick={() => copyLink(liveLink)}
                isCopied={linkCopied}
              />
            </div>
          </div>

          {/* SNAPSHOT SHARE SECTION */}
          <div className="">
            <h3 className="font-semibold text-base mb-1">Snapshot Share</h3>
            <p className="text-xs opacity-70 mb-3 leading-3.5">
              Create a one-time snapshot of your code. This link shows the
              current code only, and does NOT update if you make changes later.
            </p>

            <div className=" flex flex-col relative group mt-5 ">
              <div className="flex justify-center flex-col mb-2">
                <h3
                  className="text-xs  ml-0.5 mb-1 font-semibold"
                  style={{ color: `${theme.disabledTextColor}` }}
                >
                  Share your code to another
                </h3>
                <SearchUsername setSearchItems={setSearchItems} />
              </div>

              <div className={cn("grid grid-cols-1 gap-x-2 w-full mb-5")}>
                <div
                  className="text-xs flex items-center gap-x-3 p-3 cursor-pointer rounded-md"
                  style={{
                    color: `${theme.disabledTextColor}`,
                    backgroundColor: `${theme.border5}`,
                  }}
                >
                  <span
                    className="p-3 rounded-full opacity-70"
                    style={{
                      backgroundColor: theme.border10,
                      color: theme.textColor,
                    }}
                  >
                    {isPublic
                      ? ISPUBLIC_CONFIG.TRUE.icon
                      : ISPUBLIC_CONFIG.FALSE.icon}
                  </span>
                  <div className="flex flex-col font-semibold text-start text-sm">
                    <Dropdown
                      trigger={["click"]}
                      align={{
                        offset: [50, 5],
                      }}
                      menu={{
                        items: [
                          {
                            key: 1,
                            label: (
                              <DropdownMenu
                                theme={theme}
                                setIsPublic={setIsPublic}
                                isPublic={isPublic}
                              />
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
                      <span
                        className="hover:bg-white/20 px-2 pt-px -translate-x-2 rounded-xl w-fit flex items-center justify-center gap-x-1 opacity-80"
                        style={{
                          color: theme.textColor,
                        }}
                      >
                        {isPublic
                          ? ISPUBLIC_CONFIG.TRUE.title
                          : ISPUBLIC_CONFIG.FALSE.title}
                        <IoChevronDownOutline size={12} />
                      </span>
                    </Dropdown>
                    <span className="text-[0.7rem] leading-3 text-white/40 ">
                      {isPublic
                        ? ISPUBLIC_CONFIG.TRUE.description
                        : ISPUBLIC_CONFIG.FALSE.description}
                    </span>
                  </div>
                </div>
              </div>

              <div className={cn("flex flex-col")}>
                <h3
                  className="text-xs ml-0.5 mb-1 font-semibold"
                  style={{ color: `${theme.disabledTextColor}` }}
                >
                  Generated Link
                </h3>
                <div className="flex items-center gap-3 relative">
                  <AInput
                    value={
                      isSharingLoading
                        ? ""
                        : snapshotLink ?? "No Link Generated Yet"
                    }
                    disabled
                    className="h-8.5! opacity-65! text-xs!"
                  />

                  {isSharingLoading && (
                    <LuLoader
                      size={15}
                      className="animate-spin absolute left-[45%] -translate-x-[45%] top-1/2 -translate-y-1/2"
                    />
                  )}

                  <CopyButton
                    onClick={() => copyLink(snapshotLink ?? "")}
                    isCopied={linkCopied}
                  />
                </div>
              </div>

              <div
                className={cn(
                  "place-self-end mt-2 transition-all duration-200 ease-in z-40 "
                )}
              >
                <AButton
                  type="primary"
                  className={cn(
                    "mt-2 w-fit place-self-end text-xs! font-normal! transition-all! duration-100! ease-linear! backdrop-blur-none! border-2! "
                  )}
                  onClick={handleGenerateSafeShare}
                  disabled={isSharingLoading}
                >
                  {/* <div
                  className="backdrop-blur-3xl! absolute left-0 top-0 w-full h-[99%] -z-10 blur-2xl"
                  style={{
                    backgroundColor: theme.activeColor,
                  }}
                ></div> */}
                  <span className={font?.className}>
                    {isSharingLoading ? (
                      <LuLoader size={15} className="animate-spin" />
                    ) : (
                      "Generate Snapshot Link"
                    )}
                  </span>
                </AButton>
              </div>
            </div>
          </div>
        </div>
      </AModal>
    </>
  );
};

export default ShareModal;
