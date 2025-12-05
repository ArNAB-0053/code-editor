import { themeConfig } from "@/config/themeConfig";
import { CopyButton, RunButton, TransparentButton } from "./header-buttons";
import { useRunCode, useUpdateOutput } from "@/services/code";
import { useSelector } from "react-redux";
import { HeaderProps } from "@/@types";
import {
  selectedCode,
  selectedEditorId,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { IoMdShare } from "react-icons/io";
import { AButton, AInput, AModal } from "../ui/antd";
import { cn } from "@/lib/utils";
import { useCreateShare } from "@/services/share";
import { selectedUserId } from "@/redux/slices/userSlice";
import { appUrls } from "@/config/navigation.config";
import { IShareDataModel, IShareModel } from "@/@types/share";
import { MODAL_HEIGHT } from "../ui";
import { selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { FaLock } from "react-icons/fa";
import { SHARE_CONFIG } from "@/services";
import { LuLoader } from "react-icons/lu";

const EditorHeaderComponent = (props: HeaderProps) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [sharingDetails, setSharingDetails] = useState<IShareDataModel>();
  const [isSharingLoading, setIsSharingLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [unlock, setUnlock] = useState(false);

  const currentCode = useSelector(selectedCode);
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  // console.log("Curr Code", currentCode);

  const theme = themeConfig(props.editorTheme);

  const { mutateAsync: runCode } = useRunCode();
  const { mutateAsync: updateOutput } = useUpdateOutput();
  const { mutateAsync: createShare } = useCreateShare();

  const editorId = useSelector(selectedEditorId);
  const userId = useSelector(selectedUserId);
  const lastOpt = useRef("");

  useEffect(() => {
    setTimeout(() => {
      setLinkCopied(false);
    }, 1000);
  }, [linkCopied]);

  // console.log(editorId)

  // Ouput Header
  if (props.isOutput) {
    return (
      <div
        className="flex items-center justify-between gap-8 text-xs bg-[#43434354] border-b  px-2 py-1.5 h-[50px]"
        style={{
          borderBottomColor: `${theme?.border10}`,
        }}
      >
        <span className="text-base font-semibold tracking-[1.2px] ">
          Output
        </span>
        <TransparentButton onClick={clearOutput} loading={props.loading} />
      </div>
    );
  }

  const handleRunCode = async () => {
    props.setLoading(true);
    props.setError("");

    try {
      const res = await runCode({
        code: currentCode,
        lang: props.p_lang,
      });
      // console.log(res);
      const output = res.output ?? "";
      if (lastOpt.current !== output) {
        updateOutput(
          { editorId, output },
          {
            onSuccess: (res) => {
              // console.log("Updated", res);
              lastOpt.current = output;
              dispatch(setOutputRedux(output));
            },
          }
        );
      }
    } catch (err: any) {
      props.setError(err.message ?? String(err));
    } finally {
      props.setLoading(false);
    }
  };

  function clearOutput() {
    props.setError("");
    dispatch(setOutputRedux(""));
  }

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode).then(() => {
      props.setIsCopied(true);
    });
  };

  const handleGenerateSafeShare = async () => {
    setIsSharingLoading(true);

    try {
      const res = await createShare({
        EditorId: editorId,
        SharedByUserId: userId,
        ShareLimit: SHARE_CONFIG.MAX_SHARE,
        ExpireMinutes: SHARE_CONFIG.DEFAULT_EXPIRE_MIN,
      });
      console.log("shared", res);
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
    // Editor Header
    <div className="flex items-center justify-between text-base h-[50px] relative w-full">
      <span className="font-medium text-center flex items-center justify-center gap-x-2 w-[100px]">
        main.py
        {/* <IoMdCloudDone className="opacity-40 size-3.5" /> */}
      </span>

      <div
        className="flex-1/2 flex items-center justify-end gap-2 px-2 py-1.5 h-full rounded-bl-xl border-b border-l "
        style={{
          background: theme.headerColor,
          borderBottomColor: theme?.border10,
          borderLeft: theme?.border10,
        }}
      >
        {/* <TransparentButton
          onClick={() => {
            dispatch(setCodeRedux(""));
          }}
        /> */}

        <AButton
          onClick={() => setOpen(true)}
          className={cn(
            props.isShared && "hidden! opacity-0!",
            "aspect-square! p-0!"
          )}
        >
          <IoMdShare size={18} />
        </AButton>

        <CopyButton onClick={copyCode} isCopied={props.isCopied} />
        <RunButton onClick={handleRunCode} loading={props.loading} />
      </div>

      {!props.isShared && (
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
          {/* SNAPSHOT SHARE SECTION */}
          <div
            className="mb-6 pb-4 border-b border-gray-300/30 mt-6"
            style={{ height: MODAL_HEIGHT }}
          >
            <h3 className="font-semibold text-base mb-1">Snapshot Share</h3>
            <p className="text-xs opacity-70 mb-3">
              Create a one-time snapshot of your code. This link shows the
              current code only, and does NOT update if you make changes later.
            </p>

            <div
              className={cn(
                "border p-4 mt-3 rounded-xl flex flex-col relative backdrop-blur-2xl overflow-hidden "
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
                  "absolute left-0 top-0 w-full h-full z-10 backdrop-blur-sm",
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
                    disabled
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
                    disabled
                    className="h-8.5! opacity-65! text-xs!"
                  />
                </div>
              </div>
              <div
                className={cn(
                  "flex flex-col mt-1",
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

              <AButton
                // type=""
                className={cn(
                  "mt-2 w-fit place-self-end text-xs! font-normal! ",
                  !unlock && "pointer-events-none! select-none!"
                )}
                onClick={handleGenerateSafeShare}
                disabled={isSharingLoading}
              >
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
        </AModal>
      )}
    </div>
  );
};

export default EditorHeaderComponent;
