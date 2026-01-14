import { EditorThemeOptionsTypes } from "@/@types/theme";

export const settingsData = [
  {
    title: "Appearance",
    key: "appearance",
    children: [
      // { title: "Theme Mode", key: "appearance-theme", parentKey: "appearance" },
      { title: "Font Family", key: "appearance-font", parentKey: "appearance" },
    ],
  },
  {
    title: "Editor Preference",
    key: "editor",
    children: [
      { title: "Font Size", key: "editor-font-size", parentKey: "editor" },
      { title: "Font Family", key: "editor-font", parentKey: "editor" },
      { title: "Theme", key: "editor-theme", parentKey: "editor" },
    ],
  },
  {
    title: "Session",
    key: "session",
    children: [
      { title: "New Session", key: "session-new", parentKey: "session" },
    ],
  },
];

export const fileFolderDataTemp = [
  {
    title: "fol1",
    key: "fol1",
    children: [
      {
        title: "file",
        key: "file",
      },
      {
        title: "child-fol",
        key: "child-fol",
        children: [
          {
            title: "inside-file",
            key: "inside-file",
            children: [
              {
                title: "inside-file-2",
                key: "inside-file-2",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "file1",
    key: "file1",
    children: [
      // { title: "Theme Mode", key: "appearance-theme", parentKey: "appearance" },
      { title: "Font Family", key: "appearance-font", parentKey: "appearance" },
    ],
  },
];

export const editorThemes: EditorThemeOptionsTypes = {
  dracula: "Dracula",
  "purple-night": "Purple Night",
  "winter-dark": "Winter is Coming (Dark)",
  "one-dark-pro": "One Dark Pro",
  darcula: "Darcula",
  "github-dark-dimmed": "GitHub Dark Dimmed",
  "midnight-blue": "Midnight Blue",
  "carbon-night": "Carbon Night",
  "zinc-dark": "Zinc Dark",
  "app-dark": "App Dark (Default)",
} as const;
