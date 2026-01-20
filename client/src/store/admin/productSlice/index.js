import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addProduct = createAsyncThunk(
  "/products/addProduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:8080/api/admin/products/addProduct",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result?.data;
  },
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:8080/api/admin/products/fetchProduct",
    );
    return result?.data;
  },
);

export const editProducts = createAsyncThunk(
  "/products/editProducts",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:8080/api/admin/products/editProduct/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result?.data;
  },
);

export const deleteProducts = createAsyncThunk(
  "/products/deleteProducts",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:8080/api/admin/products/deleteProduct/${id}`,
    );
    return result?.data;
  },
);

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
