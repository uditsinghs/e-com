import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { userApi } from "@/features/api's/userApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(userApi.middleware),
});

const initializeApp = async () => {
  await store.dispatch(
    userApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();