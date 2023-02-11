import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


export const getProfiles = createAsyncThunk('/profiles',
  async (id) => {
    try {
      const { data } = await axios.get('https://dev-connector-mvyr.vercel.app/api/profile/');
      return data;
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }
)

export const getProfile = createAsyncThunk('/profile/user/id',
  async (id) => {
    try {
      console.log('hereeee');
      const { data } = await axios.get(`https://dev-connector-mvyr.vercel.app/api/profile/user/${id}`)
      return data[0];
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }
)

export const getUserProfile = createAsyncThunk('/profile/me',
  async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await axios.get('https://dev-connector-mvyr.vercel.app/api/profile/me');
      return data;
    }
    catch (error) {
      console.log(error.response.data.msg);
    }
  }
)

export const removeEducation = createAsyncThunk('/education/delete',
  async (id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await axios.delete(`https://dev-connector-mvyr.vercel.app/api/profile/education/${id}`);
      return data;
    }
    catch (error) {
      console.log(error.response.data.msg);
    }
  }
);

export const removeExperience = createAsyncThunk('/experience/delete',
  async (id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await axios.delete(`https://dev-connector-mvyr.vercel.app/api/profile/experience/${id}`);
      return data;
    }
    catch (error) {
      console.log(error.response.data.msg);
    }
  }
);

export const addUserEducation = createAsyncThunk('profile/add-education',
  async (details) => {
    try {
      console.log('inside create profile education reducer');
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.put('https://dev-connector-mvyr.vercel.app/api/profile/education', details, config);
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
      const res = await axios.put('https://dev-connector-mvyr.vercel.app/api/profile/experience', details, config);
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
      const res = await axios.post('https://dev-connector-mvyr.vercel.app/api/profile', details, config);
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
    profiles: [],
    profile: null,
    devProfile: {},
    loading: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getProfiles.fulfilled, (state, action) => {
      state.profiles = action.payload;
      state.loading = false;
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.devProfile = action.payload;
      state.loading = false;
    })
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
    builder.addCase(removeEducation.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    })
    builder.addCase(removeExperience.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    })
  }
});

export default profileSlice.reducer;
