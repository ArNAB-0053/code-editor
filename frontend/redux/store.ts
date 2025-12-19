import { persistReducer, persistStore } from "redux-persist";
import preferencesReducer from "./slices/preferenceSlice";
import activeFieldReducer from "./slices/activeFieldSlice";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import editorCodeReducer from "./slices/editorSlice";
import activeTabReducer from "./slices/activeTab";
import sharedEditorCodeReducer from "./slices/sharedEditorSlice";

const persistPreferenceConfig = {
  key: "preference",
  storage,
};

const persistUserConfig = {
  key: "user",
  storage,
};

const activeTabConfig = {
  key: "activeTab",
  storage,
};

// const persistEditorConfig_temp = {
//   key: "editor",
//   storage
// }

const persistedPreference = persistReducer(
  persistPreferenceConfig,
  preferencesReducer
);

const persistedUserDetails = persistReducer(persistUserConfig, userReducer);

const persistedActiveTab = persistReducer(activeTabConfig, activeTabReducer)

// const persistedEditor_temp =  persistReducer(persistEditorConfig_temp, editorCodeReducer)

export const store = configureStore({
  reducer: {
    preferences: persistedPreference,
    activeField: activeFieldReducer,
    user: persistedUserDetails,
    editorCode: editorCodeReducer,
    sharedEditorCode: sharedEditorCodeReducer,
    activeTab: persistedActiveTab,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
        ],
        ignoredPaths: ["register"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
