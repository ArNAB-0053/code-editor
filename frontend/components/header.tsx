import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle, FaPlay } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";

export const EditorHeader = ({
  setCode,
  runCode,
  loading,
}: {
  setCode: any;
  runCode: any;
  loading: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [isCopied]);
  return (
    <div className="flex items-center justify-between gap-8 text-base border-b border-b-white/30 px-2 py-1.5 h-[50px] font-sans">
      <span className="text-base font-medium">main.py</span>

      <div className="flex items-center gap-2 h-full">
        <button
          onClick={() => {
            setCode("");
          }}
          className="border border-[#434343] px-4 h-full text-white font-medium rounded-md cursor-pointer"
        >
          Clear
        </button>
        <button
          onClick={copyCode}
          className="bg-[#434343] h-full px-4 text-white font-medium rounded-md cursor-pointer flex items-center gap-1"
        >
          {isCopied ? (
            <>
              <FaCheckCircle className="text-green-500" />
              Copied
            </>
          ) : (
            <>
              <IoCopy />
              Copy
            </>
          )}
        </button>
        <button
          onClick={runCode}
          disabled={loading}
          className="bg-green-600 px-4 h-full text-white font-medium rounded-sm cursor-pointer flex items-center gap-1 disabled:bg-green-300/80"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <FaPlay />
          )}
          {loading ? "Running…" : "Run"}
        </button>
      </div>
    </div>
  );
};

export const OutputHeader = ({ setOutput, setError, loading }: any) => {
  function clearOutput() {
    setOutput("");
    setError("");
  }
  return (
    <div className="flex items-center justify-between gap-8 text-xs border border-white/30 border-t-0 border-l-0 px-2 py-1 h-[50px]">
      <span className="text-base font-bold font-sans">Output</span>
      <button
        onClick={clearOutput}
        disabled={loading}
        className=" px-4 py-1.5 border border-white/40 font-sans text-base font-medium text-white rounded-sm cursor-pointer"
      >
        Clear
      </button>
    </div>
  );
};
