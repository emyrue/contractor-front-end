/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import endpoint from '../endpoint';

const loginEndpoint = `${endpoint}users/sign_in`;
const getUserEndpoint = `${endpoint}v1/users`;
const logoutEndpoint = `${endpoint}users/sign_out`;

const LOGIN = 'User/NEW_SESSION';
const GET_USER = 'User/GET_USER';
const LOGOUT = 'User/END_SESSION';

export const userLogin = createAsyncThunk(LOGIN, async (user) => {
  const response = await axios.post(loginEndpoint, user);
  const serializedToken = JSON.stringify(response.headers.get('Authorization'));
  localStorage.setItem('Authorization', serializedToken);
  const { data } = response;
  return data.data;
});

export const getUser = createAsyncThunk(GET_USER, async () => {
  const serializedToken = localStorage.getItem('Authorization');
  const user = await axios.get(getUserEndpoint,
    {
      headers: {
        Authorization: JSON.parse(serializedToken),
      },
    });
  return user.data;
});

export const userLogout = createAsyncThunk(LOGOUT, async () => {
  const serializedToken = localStorage.getItem('Authorization');
  await axios.delete(logoutEndpoint, {
    headers: {
      Authorization: JSON.parse(serializedToken),
    },
  });
});

const initialState = {
  user: {},
  isLoading: false,
  message: 'initial',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.user = {};
      state.isLoading = false;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.message = 'fulfilled';
    });
    builder.addCase(getUser.rejected, (state) => {
      state.user = {};
      state.isLoading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.user = {};
      state.isLoading = false;
    });
    builder.addCase(userLogout.rejected, (state) => {
      state.user = {};
      state.isLoading = false;
    });
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default userSlice.reducer;
