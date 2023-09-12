/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getReservationsEndpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}v1/reservations`;

const GET_RESERVATIONS = 'Reservations/GET_RESERVATIONS';
const CREATE_RESERVATION = 'Reservations/CREATE_RESERVATION';
const EDIT_RESERVATION = 'Reservations/EDIT_RESERVATION';
const DELETE_RESERVATION = 'Reservations/DELETE_RESERVATION';

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

export const editReservation = createAsyncThunk(EDIT_RESERVATION, async (object) => {
  await axios.patch(`${getReservationsEndpoint}/${object.id}`, {
    reservation: {
      user_cancelled: object.user_cancelled,
      contractor_cancelled: object.contractor_cancelled,
      approved: object.approved,
      start_date: object.start_date,
      end_date: object.end_date,
    },
  });
  const response = await axios.get(getReservationsEndpoint);
  return response.data;
});

export const deleteReservation = createAsyncThunk(DELETE_RESERVATION, async (id) => {
  await axios.delete(`${getReservationsEndpoint}/${id}`);
  const response = await axios.get(getReservationsEndpoint);
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
    builder.addCase(editReservation.fulfilled, (state, action) => {
      state.allReservations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(editReservation.rejected, (state) => {
      state.allReservations = [];
      state.isLoading = false;
    });
    builder.addCase(editReservation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteReservation.fulfilled, (state, action) => {
      state.allReservations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteReservation.rejected, (state) => {
      state.allReservations = [];
      state.isLoading = false;
    });
    builder.addCase(deleteReservation.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default reservationsSlice.reducer;
