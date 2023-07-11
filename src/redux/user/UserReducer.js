/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import endpoint from '../endpoint';

const loginEndpoint = `${endpoint}users/sign_in`;
const getUserEndpoint = `${endpoint}v1/users`;
const logoutEndpoint = `${endpoint}users/sign_out`;

const LOGIN = 'User/NEW_SESSION';
const GET_USER = 'User/GET_USER';
const EDIT_USER = 'User/EDIT_USER';
const LOGOUT = 'User/END_SESSION';

export const userLogin = createAsyncThunk(LOGIN, async (user) => {
  try {
    const response = await axios.post(loginEndpoint, user);
    const serializedToken = JSON.stringify(response.headers.get('Authorization'));
    localStorage.setItem('Authorization', serializedToken);
    const { data } = response;
    return data.data;
  } catch (err) {
    // console.log(err.message);
    return {
      user: {},
      contractor: {},
      reservations: [],
    };
  }
});

export const getUser = createAsyncThunk(GET_USER, async () => {
  const serializedToken = localStorage.getItem('Authorization');
  if (serializedToken) {
    const user = await axios.get(getUserEndpoint,
      {
        headers: {
          Authorization: JSON.parse(serializedToken),
        },
      });
    return user.data;
  }
  return {
    user: {},
    contractor: {},
    reservations: [],
  };
});

export const editUser = createAsyncThunk(EDIT_USER, async (newInfo) => {
  const serializedToken = localStorage.getItem('Authorization');
  const user = await axios.get(getUserEndpoint,
    {
      headers: {
        Authorization: JSON.parse(serializedToken),
      },
    });
  const newEndpoint = `${getUserEndpoint}/${user.data.user.id}`;
  const response = await axios.patch(newEndpoint, {
    user: newInfo,
  });
  return response.data;
});

export const userLogout = createAsyncThunk(LOGOUT, async () => {
  const serializedToken = localStorage.getItem('Authorization');
  await axios.delete(logoutEndpoint, {
    headers: {
      Authorization: JSON.parse(serializedToken),
    },
  });
  localStorage.clear();
});

const initialState = {
  user: {},
  isLoading: false,
  contractor: {},
  reservations: [],
  errorMessage: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      if (action.payload.contractor) {
        state.contractor = action.payload.contractor;
      } else {
        state.contractor = {};
      }
      state.reservations = action.payload.reservations;
      state.errorMessage = '';
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.user = {};
      state.isLoading = false;
      state.contractor = {};
      state.reservations = [];
      state.errorMessage = 'Please confirm your email.';
    });
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      if (action.payload.contractor) {
        state.contractor = action.payload.contractor;
      } else {
        state.contractor = {};
      }
      state.reservations = action.payload.reservations;
      state.errorMessage = '';
    });
    builder.addCase(getUser.rejected, (state) => {
      state.user = {};
      state.isLoading = false;
      state.contractor = {};
      state.reservations = [];
      state.errorMessage = '';
    });
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      if (action.payload.contractor) {
        state.contractor = action.payload.contractor;
      } else {
        state.contractor = {};
      }
      state.reservations = action.payload.reservations;
      state.errorMessage = '';
    });
    builder.addCase(editUser.rejected, (state) => {
      state.isLoading = false;
      state.errorMessage = '';
    });
    builder.addCase(editUser.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.user = {};
      state.isLoading = false;
      state.contractor = {};
      state.reservations = [];
      state.errorMessage = '';
    });
    builder.addCase(userLogout.rejected, (state) => {
      state.user = {};
      state.isLoading = false;
      state.contractor = {};
      state.reservations = [];
      state.errorMessage = '';
    });
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default userSlice.reducer;
