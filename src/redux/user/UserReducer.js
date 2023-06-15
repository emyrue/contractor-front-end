import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import endpoint from '../endpoint';

const loginEndpoint = `${endpoint}users/sign_in`;
const logoutEndpoint = `${endpoint}users/sign_out`;

const LOGIN = 'User/NEW_SESSION';
const LOGOUT = 'User/END_SESSION';

export const userLogin = createAsyncThunk();

export { signupEndpoint, loginEndpoint, logoutEndpoint };
