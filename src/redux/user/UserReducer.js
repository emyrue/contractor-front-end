/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import endpoint from '../endpoint';

const loginEndpoint = `${endpoint}users/sign_in`;
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
  const user = await axios.post(loginEndpoint,
    {
      headers: {
        Authorization: JSON.parse(serializedToken),
      },
    });
  return user;
});

const initialState = {
  user: {},
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
      state.isLoading = false;
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [userLogin.rejected]: (state) => {
      state.user = {};
      state.isLoading = false;
    },
    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export { loginEndpoint, logoutEndpoint, LOGOUT };
export default userSlice.reducer;
