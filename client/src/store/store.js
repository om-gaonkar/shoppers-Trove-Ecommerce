import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice.js";
import adminProductSlice from "./admin/productSlice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
  },
});
export default store;
