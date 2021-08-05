import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchDefinedStandards = createAsyncThunk(
  "standards/fetchDefinedStandards",
  async () => {
    const res = await fetch(
      "https://open-data.senstate.cloud/assets/standards"
    );

    if (!res.ok) {
      throw new Error("Something went wrong.");
    }

    const data = await res.json();
    return data;
  }
);

const initialState = { standardsArr: [] };

export const definedStandardsSlice = createSlice({
  name: "standards",
  initialState,
  reducers: {
    openDevice: (state, action) => {
      state.isDeviceOpen = true;
      state.device = action.payload.device;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefinedStandards.pending, (state, action) => {})
      .addCase(fetchDefinedStandards.fulfilled, (state, action) => {
        state.standardsArr.push(...action.payload);
      })
      .addCase(fetchDefinedStandards.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export { fetchDefinedStandards };

export default definedStandardsSlice.reducer;
