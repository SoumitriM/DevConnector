import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authReducer';
import profileReducer from './slices/profileReducer';

const store = configureStore({
  reducer: {
    user: authReducer,
    profile: profileReducer
  }
});

export default store;