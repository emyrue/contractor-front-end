/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import endpoint from '../endpoint';

const getReservationsEndpoint = `${endpoint}v1/reservations`;

const GET_RESERVATIONS = 'Reservations/GET_RESERVATIONS';
const CREATE_RESERVATION = 'Reservations/CREATE_RESERVATION';
// const DELETE_RESERVATION = 'Reservations/DELETE_RESERVATIONS';

export const getReservations = createAsyncThunk(GET_RESERVATIONS, async () => {
  const response = await axios.get(getReservationsEndpoint);
  return response.data;
});

export const createReservation = createAsyncThunk(CREATE_RESERVATION, async (object) => {
  const response = await axios.post(getReservationsEndpoint, object);
  if (response.data.messages.reservation_period) {
    return {
      messages: response.data.messages.reservation_period,
    };
  }
  return response.data;
});

const initialState = {
  allReservations: [],
  createReservationMessages: [],
  isLoading: false,
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReservations.fulfilled, (state, action) => {
      state.allReservations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getReservations.rejected, (state) => {
      state.allReservations = [];
      state.isLoading = false;
    });
    builder.addCase(getReservations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createReservation.fulfilled, (state, action) => {
      state.createReservationMessages = action.payload.messages;
      state.isLoading = false;
    });
    builder.addCase(createReservation.rejected, (state) => {
      state.createReservationMessages = [];
      state.isLoading = false;
    });
    builder.addCase(createReservation.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default reservationsSlice.reducer;
