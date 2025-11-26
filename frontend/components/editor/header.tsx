import { themeConfig } from "@/config/themeConfig";
import { CopyButton, RunButton, TransparentButton } from "../header-buttons";
import { HeaderProps } from "@/@types/_base";

const EditorHeaderComponent = (props: HeaderProps) => {
  const theme = themeConfig(props.editorTheme);

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

  const runCode = async () => {
    props.setLoading(true);
    props.setOutput("");
    props.setError("");

    try {
      const res = await fetch("http://localhost:5000/api/CodeRunner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: props.code, lang: props.p_lang }),
      });

      const json = await res.json();
      props.setOutput(json.output ?? "");
    } catch (err: any) {
      props.setError(err.message ?? String(err));
    } finally {
      props.setLoading(false);
    }
  };

  function clearOutput() {
    props.setOutput("");
    props.setError("");
  }

  const copyCode = () => {
    navigator.clipboard.writeText(props.code).then(() => {
      props.setIsCopied(true);
    });
  };

  return (
    // Editor Header
    <div className="flex items-center justify-between text-base h-[50px] relative w-full">
      <span className="font-medium text-center flex items-center justify-center w-[100px]">
        main.py
      </span>

      <div
        className="flex-1/2 flex items-center justify-end gap-2 px-2 py-1.5 h-full rounded-bl-xl border-b border-l "
        style={{
          background: theme.headerColor,
          borderBottomColor: theme?.border10,
          borderLeft: theme?.border10,
        }}
      >
        <TransparentButton
          onClick={() => {
            props.setCode("");
          }}
        />

        <CopyButton onClick={copyCode} isCopied={props.isCopied} />
        <RunButton onClick={runCode} loading={props.loading} />
      </div>
    </div>
  );
};

export default EditorHeaderComponent;
