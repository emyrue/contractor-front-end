/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import endpoint from '../endpoint';

const getContractorsEndpoint = `${endpoint}v1/contractors`;

const GET_CONTRACTORS = 'Contractors/GET_CONTRACTORS';

const getContractors = createAsyncThunk(GET_CONTRACTORS, async () => {
  const response = await axios.get(getContractorsEndpoint);
  return response.data;
});
