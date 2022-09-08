import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken";

export const register = createAsyncThunk('auth/register',
  async (details, { rejectedWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.post('http://localhost:9000/api/users', details, config);
      console.log(res)
      return res.data;
    }
    catch (error) {
      return rejectedWithValue('dd');
    }

  }
)

export const login = createAsyncThunk('auth/login',
  async (details, { rejectedWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.post('http://localhost:9000/api/auth', details, config);
      await setAuthToken(res.data.token);
      const { data } = await axios.get('http://localhost:9000/api/auth/');
      return {user: data, token: res.data.token};
    }
    catch (error) {
      return rejectedWithValue(error.response.message);
    }

  }
)

export const logout = createAsyncThunk('auth/logout', () => {
  localStorage.removeItem('token');
})

export const loadUser = createAsyncThunk('/user',
  async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await axios.get('http://localhost:9000/api/auth/');
      return data;
    }
    catch (error) {
      console.log(error.response.data.msg);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.isAuthenticated = false;
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.error = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.loading = false;
      state.error = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.loading = false;
      state.error = true;
      state.user = null;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isAuthenticated = false;
      state.loading = true;
    });
    builder.addCase(loadUser.pending, (state, action) => {
      state.user = { name: "", avatar: "#" };
      console.log('user fetched in reducr', action.payload)
      state.isAuthenticated = true;
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload;
      console.log('user fetched in reducr', action.payload)
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {}
      state.isAuthenticated = false;
      state.loading = false;
    })
  }
});

export default authSlice.reducer;