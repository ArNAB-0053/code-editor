import { persistReducer, persistStore } from "redux-persist";
import preferencesReducer from "./slices/preferenceSlice"
import activeFieldReducer from "./slices/activeFieldSlice"
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import editorCodeReducer from "./slices/editorSlice"

const persistPreferenceConfig = {
    key: "prefercence",
    storage
}

const persistUserConfig = {
  key: "user",
  storage
}

const persistedPreference = persistReducer(persistPreferenceConfig, preferencesReducer)

const persistedUserDetails = persistReducer(persistUserConfig, userReducer)

export const store = configureStore({
    reducer: {
        preferences: persistedPreference,
        activeField: activeFieldReducer,
        user: persistedUserDetails,
        editorCode: editorCodeReducer
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
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;