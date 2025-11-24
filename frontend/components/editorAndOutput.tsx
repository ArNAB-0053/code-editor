"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { EditorHeader, OutputHeader } from "./header";
import { getResult } from "@/services/api";

export default function EditorAndOutput() {
  const [code, setCode] = useState(
    `# Staring Coding Journey
print("Hello World!!")`
  );
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function runCode() {
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const res = await getResult(code);
      setOutput(res);
    } catch (err: Error | any) {
      console.error(err);
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full overflow-hidden border-t border-t-white/20">
      <div
        style={{ marginBottom: 8 }}
        className="flex-1/2 border border-white/20 border-t-0 overflow-hidden"
      >
        <EditorHeader loading={loading} runCode={runCode} setCode={setCode} />
        <Editor
          value={code}
          onChange={(value) => setCode(value ?? "")}
          width="100%"
          height="calc(95vh - 95px)"
          defaultLanguage="python"
          defaultValue="# Staring Coding Journey
print('Hello World!!')"
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
        ;
      </div>

      <div
        className="flex-1/2 min-h-[95vh] overflow-y-auto"
        style={{
          background: "#0f172a",
          color: "#e6eef8",
          whiteSpace: "pre-wrap", // preserve newlines and wrap long lines
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Courier New', monospace",
        }}
      >
        <OutputHeader
          setError={setError}
          setOutput={setOutput}
          loading={loading}
        />
        <div className="p-2 font-sans">
          {error ? (
            <span style={{ color: "#ffb4b4" }}>{error}</span>
          ) : (
            output || (loading ? "Running..." : "No output")
          )}
        </div>
      </div>
    </div>
  );
}
