import { persistReducer, persistStore } from "redux-persist";
import preferencesReducer from "./slices/preferenceSlice"
import activeFieldReduces from "./slices/activeFieldSlice"
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
    key: "prefercence",
    storage
}

const persistedPreference = persistReducer(persistConfig, preferencesReducer)

export const store = configureStore({
    reducer: {
        preferences: persistedPreference,
        activeField: activeFieldReduces,
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