/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import endpoint from '../endpoint';

const getContractorsEndpoint = `${endpoint}v1/contractors`;

const GET_CONTRACTORS = 'Contractors/GET_CONTRACTORS';
const CREATE_CONTRACTOR = 'Contractors/CREATE_CONTRACTOR';

export const getContractors = createAsyncThunk(GET_CONTRACTORS, async () => {
  const response = await axios.get(getContractorsEndpoint);
  return response.data;
});

export const createContractor = createAsyncThunk(CREATE_CONTRACTOR, async (object) => {
  const myResponse = await axios.post(getContractorsEndpoint, object);
  console.log(myResponse);
  const response = await axios.get(getContractorsEndpoint);
  console.log(response);
  return response.data;
});

const initialState = {
  allContractors: [],
  isLoading: false,
};

const contractorsSlice = createSlice({
  name: 'contractors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContractors.fulfilled, (state, action) => {
      state.allContractors = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getContractors.rejected, (state) => {
      state.allContractors = [];
      state.isLoading = false;
    });
    builder.addCase(getContractors.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createContractor.fulfilled, (state, action) => {
      state.allContractors = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createContractor.rejected, (state) => {
      state.allContractors = [];
      state.isLoading = false;
    });
    builder.addCase(createContractor.pending, (state) => {
      state.isLoading = false;
    });
  },
});

export default contractorsSlice.reducer;
