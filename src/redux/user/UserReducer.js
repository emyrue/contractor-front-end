/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const loginEndpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}users/sign_in`;
const getUsersEndpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}v1/users`;
const logoutEndpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}users/sign_out`;

const LOGIN = 'User/NEW_SESSION';
const GET_USERS = 'User/GET_USERS';
const GET_USER = 'User/GET_USER';
const EDIT_USER = 'User/EDIT_USER';
const LOGOUT = 'User/END_SESSION';
const CLEAR_LOGIN = 'User/CLEAR_LOGIN';

export const userSignUp = async (user) => {
  await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}users`,
    {
      user,
    });
};

export const getAllUsers = createAsyncThunk(GET_USERS, async () => {
  const serializedToken = localStorage.getItem('Authorization');
  const users = await axios.get(getUsersEndpoint, {
    headers: {
      Authorization: JSON.parse(serializedToken),
    },
  });
  return users.data;
});

export const userLogin = createAsyncThunk(LOGIN, async (user) => {
  try {
    const response = await axios.post(loginEndpoint, user);
    const serializedToken = JSON.stringify(response.headers.get('Authorization'));
    localStorage.setItem('Authorization', serializedToken);
    localStorage.setItem('userId', response.data.data.user.id);
    const { data } = response;
    return data.data;
  } catch (err) {
    return {
      allUsers: [],
      user: {},
      contractor: {},
      reservations: [],
      loginMessage: err.response.data.error,
    };
  }
});

export const clearLoginMessage = createAsyncThunk(CLEAR_LOGIN);

export const getUser = createAsyncThunk(GET_USER, async () => {
  const serializedToken = localStorage.getItem('Authorization');
  const userId = localStorage.getItem('userId');
  if (serializedToken) {
    const user = await axios.get(`${getUsersEndpoint}/${userId}`,
      {
        headers: {
          Authorization: JSON.parse(serializedToken),
        },
      });
    return user.data;
  }
  return {
    allUsers: [],
    user: {},
    contractor: {},
    reservations: [],
  };
});

export const editUser = createAsyncThunk(EDIT_USER, async (newInfo) => {
  const newEndpoint = `${getUsersEndpoint}/${newInfo.id}`;
  const response = await axios.patch(newEndpoint, {
    user: {
      name: newInfo.name,
      role: newInfo.role,
      picture_link: newInfo.picture_link,
    },
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
  allUsers: [],
  user: {},
  isLoading: false,
  contractor: {},
  reservations: [],
  loginMessage: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.allUsers = [];
      state.isLoading = false;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.contractor = action.payload.contractor;
      state.reservations = action.payload.reservations;
      state.loginMessage = action.payload.loginMessage;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.user = {};
      state.isLoading = false;
      state.contractor = {};
      state.reservations = [];
      state.loginMessage = action.payload.message;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.contractor = action.payload.contractor;
      state.reservations = action.payload.reservations;
      state.loginMessage = '';
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
    });
    builder.addCase(editUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editUser.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.user = {};
      state.isLoading = false;
      state.contractor = {};
      state.reservations = [];
    });
    builder.addCase(userLogout.rejected, (state) => {
      state.user = {};
      state.isLoading = false;
      state.contractor = {};
      state.reservations = [];
    });
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(clearLoginMessage.fulfilled, (state) => {
      state.loginMessage = '';
    });
    builder.addCase(clearLoginMessage.pending, (state) => {
      state.loginMessage = '';
    });
    builder.addCase(clearLoginMessage.rejected, (state) => {
      state.loginMessage = '';
    });
  },
});

export default userSlice.reducer;
