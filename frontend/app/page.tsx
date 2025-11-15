import EditorAndOutput from "@/components/editorAndOutput";

const page = () => {
  return (
    <div
      style={{
        fontFamily: "Inter, Roboto, system-ui",
        height: "calc(100vh - 25px)",
      }}
      className="w-full overflow-y-hidden"
    >
      <h2
        className="font-bold text-xl"
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Courier New', monospace",
        }}
      >
        Python Editor
      </h2>

      <p
        className="mb-3 italic -mt-2"
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Courier New', monospace",
        }}
      >
        Do whatever you like
      </p>
      <EditorAndOutput />
    </div>
  );
};

export default page;
