import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { ThemeSate} from '../../../dto/axios.dto';

const initialState: ThemeSate = {
  mode: false,
};

// Define a createAsyncThunk for setting profile data:
export const setTheme = createAsyncThunk(
  'theme',
  async (payload: any, {rejectWithValue}) => {
    try {
      return payload;
    } catch (error: any) {
      // Handle any other errors that might occur during the request
      return rejectWithValue(error);
    }
  },
);

// theme slice for dark/light mode
const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setTheme.fulfilled, (state, action) => {
      state.mode = action.payload;
    });
  },
});

export default ThemeSlice;
