export const getDefaultCode = (lang: string) => {
  let defaultCode = "";

  switch (lang) {
    case "python":
      defaultCode = `# Staring Coding Journey
print("Hello World!!")`;
      break;

    case "javascript":
      defaultCode = `// Staring Coding Journey
console.log("Hello World!!")`;
      break;

    default:
      defaultCode = "";
      break;
  }
  return defaultCode;
};