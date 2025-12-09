import { ThemeTypes } from "@/@types/theme";

export const themeConfig = (theme?: string): ThemeTypes => {
  switch (theme) {
    // DRACULA
    case "dracula":
      return {
        headerColor: "#282a36",
        baseTextColor: "#f8f8f2",
        outputBackground: "#1e1f29",
        editorBackground: "#282a36",
        border: "#44475a",
        border20: "rgba(255,255,255,0.20)",
        border15: "rgba(255,255,255,0.15)",
        border10: "rgba(255,255,255,0.10)",
        border5: "rgba(255,255,255,0.05)",
        outputColor: "#f8f8f2",
        splitterColor: "#44475a",
        activeColor: "#bd93f9",
        hoverColor: "#ff79c6",
        modalBg: "#21222c",
        textColor: '#e5e5e5',
        disabledTextColor: '#dadada',
        hoverTextColor: '#cccccc',

        background:"#2b066080",
        
        editorSelectionBackground: "#44475a",
        editorLineNumberForeground: "#6272a4",
        syntaxKeyword: "#ff79c6", 
        syntaxString: "#f1fa8c", 
        syntaxVariable: "#50fa7b", 
        syntaxFunction: "#8be9fd", 
        syntaxComment: "#6272a4", 
        syntaxNumber: "#bd93f9", 
        syntaxOperator: "#ff79c6", 
      };

    // NIGHT OWL (Purple Night)
    case "purple-night":
      return {
        headerColor: "#01111d",
        baseTextColor: "#d6deeb",
        outputBackground: "#011627",
        editorBackground: "#011627",
        border: "#122d42",
        border20: "rgba(255,255,255,0.20)",
        border15: "rgba(255,255,255,0.15)",
        border10: "rgba(255,255,255,0.10)",
        border5: "rgba(255,255,255,0.05)",
        outputColor: "#d6deeb",
        splitterColor: "#122d42",
        activeColor: "#7e57c2",
        hoverColor: "#c792ea",
        modalBg: "#0b2942",
        textColor: '#e5e5e5',
        disabledTextColor: '#dadada',
        hoverTextColor: '#cccccc',
        background: "#011627",
        
        editorSelectionBackground: "#1d3b53",
        editorLineNumberForeground: "#4b6479",
        syntaxKeyword: "#c792ea", 
        syntaxString: "#ecc48d", 
        syntaxVariable: "#7fdbca", 
        syntaxFunction: "#82aaff", 
        syntaxComment: "#637777",
        syntaxNumber: "#f78c6c", 
        syntaxOperator: "#c792ea", 
      };

    // WINTER IS COMING (Dark Blue) - Deep Blue Theme
    case "winter-dark":
      return {
        headerColor: "#01111d",
        baseTextColor: "#d6deeb",
        outputBackground: "#011627",
        editorBackground: "#011627",
        border: "#122d42",
        border20: "rgba(255,255,255,0.20)",
        border15: "rgba(255,255,255,0.15)",
        border10: "rgba(255,255,255,0.10)",
        border5: "rgba(255,255,255,0.05)",
        outputColor: "#d6deeb",
        splitterColor: "#1e3a52",
        activeColor: "#82aaff",
        hoverColor: "#7fdbca",
        modalBg: "#0b2942",
        textColor: '#e5e5e5',
        disabledTextColor: '#dadada',
        hoverTextColor: '#cccccc',
        background: "#011627",
        
        editorSelectionBackground: "#1d3b53",
        editorLineNumberForeground: "#5f7e97",
        syntaxKeyword: "#82aaff", 
        syntaxString: "#ecc48d", 
        syntaxVariable: "#7fdbca", 
        syntaxFunction: "#82aaff", 
        syntaxComment: "#5f7e97", 
        syntaxNumber: "#f78c6c", 
        syntaxOperator: "#c792ea", 
      };

    // ONE DARK PRO - Atom's Iconic Theme
    case "one-dark-pro":
      return {
        headerColor: "#21252b",
        baseTextColor: "#abb2bf",
        outputBackground: "#1e2227",
        editorBackground: "#282c34",
        border: "#3e4451",
        border20: "rgba(255,255,255,0.2)",
        border15: "rgba(255,255,255,0.15)",
        border10: "rgba(255,255,255,0.10)",
        border5: "rgba(255,255,255,0.05)",
        outputColor: "#abb2bf",
        splitterColor: "#3e4451",
        activeColor: "#61afef",
        hoverColor: "#56b6c2",
        modalBg: "#282c34",
        textColor: '#e5e5e5',
        disabledTextColor: '#dadada',
        hoverTextColor: '#cccccc',
        background: "#282c34",
        
        editorSelectionBackground: "#3e4451",
        editorLineNumberForeground: "#636d83",
        syntaxKeyword: "#c678dd", 
        syntaxString: "#98c379", 
        syntaxVariable: "#e06c75", 
        syntaxFunction: "#61afef", 
        syntaxComment: "#5c6370", 
        syntaxNumber: "#d19a66", 
        syntaxOperator: "#56b6c2", 
      };

    // DARCULA - JetBrains Official Theme
    case "darcula":
      return {
        headerColor: "#3c3f41",
        baseTextColor: "#a9b7c6",
        outputBackground: "#2b2b2b",
        editorBackground: "#2b2b2b",
        border: "#323232",
        border20: "rgba(255,255,255,0.20)",
        border15: "rgba(255,255,255,0.15)",
        border10: "rgba(255,255,255,0.1)",
        border5: "rgba(255,255,255,0.05)",
        outputColor: "#a9b7c6",
        splitterColor: "#323232",
        activeColor: "#9876aa",
        hoverColor: "#b589d6",
        modalBg: "#3c3f41",
        textColor: '#e5e5e5',
        disabledTextColor: '#dadada',
        hoverTextColor: '#cccccc',
        background: "#2b2b2b",
        
        editorSelectionBackground: "#214283",
        editorLineNumberForeground: "#606366",
        syntaxKeyword: "#cc7832", 
        syntaxString: "#6a8759", 
        syntaxVariable: "#9876aa", 
        syntaxFunction: "#ffc66d", 
        syntaxComment: "#808080", 
        syntaxNumber: "#6897bb", 
        syntaxOperator: "#a9b7c6", 
      };

    // GITHUB DARK DIMMED - Official GitHub Theme
    case "github-dark-dimmed":
      return {
        headerColor: "#2d333b",
        baseTextColor: "#adbac7",
        outputBackground: "#22272e",
        editorBackground: "#22272e",
        border: "#444c56",
        border20: "rgba(255,255,255,0.20)",
        border15: "rgba(255,255,255,0.15)",
        border10: "rgba(255,255,255,0.10)",
        border5: "rgba(255,255,255,0.05)",
        outputColor: "#adbac7",
        splitterColor: "#444c56",
        activeColor: "#539bf5",
        hoverColor: "#6cb6ff",
        modalBg: "#1c2128",
        textColor: '#e5e5e5',
        disabledTextColor: '#dadada',
        hoverTextColor: '#cccccc',
        background: "#22272e",
        
        editorSelectionBackground: "#3d444d",
        editorLineNumberForeground: "#768390",
        syntaxKeyword: "#f47067", 
        syntaxString: "#96d0ff", 
        syntaxVariable: "#dcbdfb", 
        syntaxFunction: "#dcbdfb", 
        syntaxComment: "#768390", 
        syntaxNumber: "#f69d50", 
        syntaxOperator: "#f47067", 
      };

    // MIDNIGHT BLUE - Deep Blue Professional
    case "midnight-blue":
      return {
        headerColor: "#1b2a41",
        baseTextColor: "#e8f1ff",
        outputBackground: "#0d1b30",
        editorBackground: "#11243d",
        border: "#274059",
        border20: "rgba(255,255,255,0.20)",
        border15: "rgba(255,255,255,0.15)",
        border10: "rgba(255,255,255,0.1)",
        border5: "rgba(255,255,255,0.05)",
        outputColor: "#d5e6ff",
        splitterColor: "#2b3e56",
        activeColor: "#4fa3ff",
        hoverColor: "#4095ef",
        modalBg: "#152337",
        textColor: '#e5e5e5',
        disabledTextColor: '#dadada',
        hoverTextColor: '#cccccc',
        background: "#11243d",
        
        editorSelectionBackground: "rgba(255,255,255,0.15)",
        editorLineNumberForeground: "#8cb4ff",
        syntaxKeyword: "#78a9ff",
        syntaxString: "#e2c08d",
        syntaxVariable: "#9fcbff",
        syntaxFunction: "#ffd68c",
        syntaxComment: "#55708d",
        syntaxNumber: "#c2ffdf",
        syntaxOperator: "#bbd1ff",
      };

    // CARBON NIGHT - IBM Carbon Design
    case "carbon-night":
      return {
        headerColor: "#2b2b2b",
        baseTextColor: "#ffffff",
        outputBackground: "#161616",
        editorBackground: "#262626",
        border: "#393939",
        border20: "rgba(255,255,255,0.20)",
        border15: "rgba(255,255,255,0.15)",
        border10: "rgba(255,255,255,0.1)",
        border5: "rgba(255,255,255,0.05)",
        outputColor: "#f4f4f4",
        splitterColor: "#393939",
        activeColor: "#0f62fe",
        hoverColor: "#0353e9",
        modalBg: "#262626",
        textColor: '#e5e5e5',
        disabledTextColor: '#dadada',
        hoverTextColor: '#cccccc',
        background: "#262626",
        
        editorSelectionBackground: "rgba(255,255,255,0.12)",
        editorLineNumberForeground: "#6f6f6f",
        syntaxKeyword: "#ff7eb6", 
        syntaxString: "#42be65", 
        syntaxVariable: "#82cfff", 
        syntaxFunction: "#82cfff",
        syntaxComment: "#8d8d8d", 
        syntaxNumber: "#ee5396", 
        syntaxOperator: "#ffffff", 
      };

    // ZINC DARK - Modern Neutral Gray
    case "zinc-dark":
      return {
        headerColor: "#27272a",
        baseTextColor: "#fafafa",
        outputBackground: "#18181b",
        editorBackground: "#27272a",
        border: "#3f3f46",
        border20: "rgba(255,255,255,0.20)",
        border15: "rgba(255,255,255,0.15)",
        border10: "rgba(255,255,255,0.10)",
        border5: "rgba(255,255,255,0.05)",
        outputColor: "#fafafa",
        splitterColor: "#3f3f46",
        activeColor: "#818cf8",
        hoverColor: "#6366f1",
        modalBg: "#18181b",
        textColor: '#e5e5e5',
        disabledTextColor: '#dadada',
        hoverTextColor: '#cccccc',
        background: "#27272a",
        
        editorSelectionBackground: "rgba(255,255,255,0.12)",
        editorLineNumberForeground: "#a1a1aa",
        syntaxKeyword: "#a78bfa",
        syntaxString: "#f9a8d4",
        syntaxVariable: "#a5f3fc",
        syntaxFunction: "#c7d2fe",
        syntaxComment: "#71717a",
        syntaxNumber: "#fca5a5",
        syntaxOperator: "#e4e4e7",
      };

    // DEFAULT APP DARK
    case "app-dark":
    default:
      return {
        headerColor: "#43434354",
        baseTextColor: "#fff",
        outputBackground: "#0f172a8e",
        editorBackground: "#0f172ace",
        border: "#434343",
        border20: "rgba(255,255,255,0.20)",
        border15: "rgba(255,255,255,0.15)",
        border10: "rgba(255,255,255,0.1)",
        border5: "rgba(255,255,255,0.05)",
        outputColor: "#e6eef8",
        splitterColor: "rgba(255,255,255,0.20)",
        activeColor: "#1591EA",
        hoverColor: "#1591ea",
        modalBg: "#1b294b",
        textColor: '#e5e5e5',
        disabledTextColor: '#dadada',
        hoverTextColor: '#cccccc',
        background: "#0f172ace",
        
        editorSelectionBackground: "#ffffff1a",
        editorLineNumberForeground: "#ffffff73",
        syntaxKeyword: "#569cd6",
        syntaxString: "#ce9178",
        syntaxVariable: "#9cdcfe",
        syntaxFunction: "#dcdcaa",
        syntaxComment: "#6a9955",
        syntaxNumber: "#b5cea8",
        syntaxOperator: "#d4d4d4",
      };
  }
};
