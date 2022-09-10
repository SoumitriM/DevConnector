import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const getUserProfile = createAsyncThunk('/profile/me',
  async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await axios.get('http://localhost:9000/api/profile/me');
      return data;
    }
    catch (error) {
      console.log(error.response.data.msg);
    }
  }
)

export const addUserEducation = createAsyncThunk('profile/add-education',
async (details) => {
  try {
    console.log('inside create profile education reducer');
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put('http://localhost:9000/api/profile/education', details, config);
    return res.data;
  }
  catch (error) {
    console.log('something')
  }

}
)

export const addUserExperience = createAsyncThunk('profile/add-experience',
  async (details) => {
    try {
      console.log('inside create profile experience reducer');
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.put('http://localhost:9000/api/profile/experience', details, config);
      console.log(res.data);
      return res.data;
    }
    catch (error) {
      console.log(error.response.m);
    }

  }
)

export const createUserProfile = createAsyncThunk('profile/create-profile',
  async (details, { rejectedWithValue }) => {
    try {
      console.log('inside create profile reducer');
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.post('http://localhost:9000/api/profile', details, config);
      return res.data;
    }
    catch (error) {
      return rejectedWithValue('dd');
    }

  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    loading: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    })
    builder.addCase(createUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    })
    builder.addCase(addUserEducation.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    })
    builder.addCase(addUserExperience.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    })
  }
});

export default profileSlice.reducer;
