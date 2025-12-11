import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { appUrls } from "@/config/navigation.config";
import { selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { FaLock } from "react-icons/fa";
import { SHARE_CONFIG } from "@/services";
import { LuLoader } from "react-icons/lu";
import { Switch } from "antd";
import { MODAL_HEIGHT } from "@/components/ui";
import { AButton, AInput, AModal } from "@/components/ui/antd";
import { CopyButton } from "@/components/editor/header-buttons";
import { useCreateShare } from "@/services/share";
import { selectedEditorId } from "@/redux/slices/editorSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { ThemeTypes } from "@/@types/theme";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { IShareDataModel, IShareRequest } from "@/@types/share";
import { _VisibilityEnum } from "@/@types/_enums";

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
  const [unlock, setUnlock] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const websiteFont = useSelector(selectWebsiteFont);
  const editorId = useSelector(selectedEditorId);
  const userId = useSelector(selectedUserId);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const { mutateAsync: createShare } = useCreateShare();

  useEffect(() => {
    setTimeout(() => {
      setLinkCopied(false);
    }, 1000);
  }, [linkCopied]);

  const payload: IShareRequest = {
    EditorId: editorId,
    SharedByUserId: userId,
    ShareLimit: SHARE_CONFIG.MAX_SHARE,
    ExpireMinutes: SHARE_CONFIG.DEFAULT_EXPIRE_MIN,
    Visibility: isPublic ? _VisibilityEnum.Public : _VisibilityEnum.Private,
  };

  const handleGenerateSafeShare = async () => {
    setIsSharingLoading(true);

    try {
      const res = await createShare(payload);
      console.log(payload, "\n", "shared", res);
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
    `http://localhost:3000${appUrls.SHARE}/${sharingDetails?.sharedId}?mode=snapshot`;
  const liveLink = `http://localhost:3000${appUrls.SHARE}/${editorId}?mode=live`;

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      setLinkCopied(true);
    });
  };
  return (
    <AModal
      title="Share Your Code"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={false}
      className="overflow-hidden "
      confirmLoading={isSharingLoading}
    >
      <div
        style={{ height: MODAL_HEIGHT, width: "calc(100% + 20px)" }}
        className="overflow-y-auto custom-scrollbar pr-5 mt-7"
      >
        {/* SNAPSHOT SHARE SECTION */}
        <div className="mb-6 pb-4 border-b border-gray-300/30">
          <h3 className="font-semibold text-base mb-1">Snapshot Share</h3>
          <p className="text-xs opacity-70 mb-3 leading-3.5">
            Create a one-time snapshot of your code. This link shows the current
            code only, and does NOT update if you make changes later.
          </p>

          <div
            className={cn(
              "border-2 p-4 mt-3 rounded-xl flex flex-col relative overflow-hidden group "
            )}
            style={{
              borderColor: theme.border20,
            }}
          >
            <div
              style={{
                backgroundColor: `${theme.activeColor}40`,
              }}
              className={cn(
                "absolute left-0 top-0 w-full h-full z-10 backdrop-blur-sm rounded-xl",
                unlock
                  ? "hidden"
                  : "flex items-center justify-center flex-col gap-2"
              )}
            >
              <FaLock size={20} />
              <AButton
                onClick={() => setUnlock(true)}
                style={{
                  backgroundColor: theme.border20,
                }}
              >
                Unlock
              </AButton>
            </div>

            <div
              className={cn(
                "flex items-center justify-center gap-x-2",
                !unlock && "pointer-events-none! select-none!"
              )}
            >
              <div className="flex-1/2 flex flex-col">
                <h3
                  className="text-xs ml-0.5"
                  style={{ color: `${theme.disabledTextColor}95` }}
                >
                  Share Limit
                </h3>
                <AInput
                  value={SHARE_CONFIG.MAX_SHARE}
                  className="h-8.5! opacity-65! text-xs! "
                />
              </div>
              <div className="flex-1/2 flex flex-col ">
                <h3
                  className="text-xs ml-0.5"
                  style={{ color: `${theme.disabledTextColor}95` }}
                >
                  Expire (In Minutes)
                </h3>
                <AInput
                  value={SHARE_CONFIG.DEFAULT_EXPIRE_MIN}
                  className="h-8.5! opacity-65! text-xs!"
                />
              </div>
            </div>

            <div
              className={cn(
                "flex flex-col my-5",
                !unlock && "pointer-events-none! select-none!"
              )}
            >
              <h3
                className="text-xs ml-0.5 "
                style={{ color: `${theme.disabledTextColor}95` }}
              >
                Public Access
              </h3>
              <span className=" flex items-center gap-x-5 ml-0.5">
                <span
                  className="w-[70%] text-[0.7rem] leading-3 text-white/40 border-l-2 pl-2 mt-0.5"
                  style={{
                    borderLeftColor: theme.activeColor,
                  }}
                >
                  When enabled, anyone with the link can view this share. When
                  disabled, only logged-in users can access it.
                </span>
                <Switch
                  // defaultChecked
                  onChange={() => {
                    setIsPublic(true);
                  }}
                  className="w-10!"
                  rootClassName="root"
                />
              </span>
            </div>

            <div
              className={cn(
                "flex flex-col",
                !unlock && "pointer-events-none! select-none!"
              )}
            >
              <h3
                className="text-xs ml-0.5"
                style={{ color: `${theme.disabledTextColor}95` }}
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
                "absolute left-1/2 -translate-x-1/2 -bottom-8 transition-all duration-200 ease-in z-40 ",
                unlock && "group-hover:bottom-1"
              )}
            >
              <AButton
                type="primary"
                className={cn(
                  "mt-2 w-fit place-self-end text-xs! font-normal! transition-all! duration-100! ease-linear! backdrop-blur-none! border-2! ",
                  !unlock && "pointer-events-none! select-none!"
                )}
                onClick={handleGenerateSafeShare}
                disabled={isSharingLoading}
              >
                <div
                  className="backdrop-blur-3xl! absolute left-0 top-0 w-full h-[99%] -z-10 blur-2xl"
                  style={{
                    backgroundColor: theme.activeColor,
                  }}
                ></div>
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

        {/* LIVE SHARE SECTION */}
        <div>
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
      </div>
    </AModal>
  );
};

export default ShareModal;
