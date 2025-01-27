import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {LikeState, wallData} from '../../../dto/axios.dto';

const initialState: LikeState = {
  likeList: [],
  likeLoading: false,
};

// Define a createAsyncThunk for setting like data:
export const setLike = createAsyncThunk<wallData[], wallData[]>(
  'like/setLike',
  async (payload, {rejectWithValue}) => {
    try {
      return payload; // Return the data as-is
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  },
);

// Define LikeSlice for managing like state
const LikeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setLike.pending, state => {
        state.likeLoading = true; // Set loading state
      })
      .addCase(setLike.fulfilled, (state, action) => {
        state.likeList = action.payload; // Update the likeList
        state.likeLoading = false; // Reset loading state
      })
      .addCase(setLike.rejected, state => {
        state.likeLoading = false; // Reset loading state
      });
  },
});

export default LikeSlice;
