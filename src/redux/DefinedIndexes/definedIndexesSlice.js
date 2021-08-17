import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchDefinedIndexes = createAsyncThunk(
  "indexes/fetchDefinedIndexes",
  async () => {
    const res = await fetch("https://open-data.senstate.cloud/assets/indexes");

    if (!res.ok) {
      throw new Error("Something went wrong.");
    }

    const data = await res.json();
    return data;
  }
);

const initialState = [];

export const definedIndexesSlice = createSlice({
  name: "indexes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefinedIndexes.pending, (state, action) => {})
      .addCase(fetchDefinedIndexes.fulfilled, (state, action) => {
        state.push(...action.payload);
      })
      .addCase(fetchDefinedIndexes.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export { fetchDefinedIndexes };

export default definedIndexesSlice.reducer;
