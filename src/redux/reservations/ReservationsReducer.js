/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import endpoint from '../endpoint';

const getReservationsEndpoint = `${endpoint}v1/reservations`;

const GET_RESERVATIONS = 'Reservations/GET_RESERVATIONS';
// const CREATE_RESERVATION = 'Reservations/CREATE_RESERVATIONS';
// const DELETE_RESERVATION = 'Reservations/DELETE_RESERVATIONS';

export const getReservations = createAsyncThunk(GET_RESERVATIONS, async (userId, contractorId) => {
  const response = await axios.get(getReservationsEndpoint);
  let userReservations = [];
  let contractorReservations = [];

  if (userId && !contractorId) {
    userReservations = response.data.filter(
      (reservation) => reservation.contractor_id === contractorId,
    );
  } else if (!userId && contractorId) {
    contractorReservations = response.data.filter((reservation) => reservation.user_id === userId);
  } else if (userId && contractorId) {
    response.data.map((reservation) => {
      if (reservation.user_id === userId) {
        userReservations.push(reservation);
      }
      if (reservation.contractor_id === contractorId) {
        contractorReservations.push(reservation);
      }
      return null;
    });
  }
  return {
    userReservations,
    contractorReservations,
  };
});

const initialState = {
  user_reservations: [],
  contractor_reservations: [],
  isLoading: false,
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReservations.fulfilled, (state, action) => {
      state.user_reservations = action.payload.userReservations;
      state.contractor_reservations = action.payload.contractorReservations;
      state.isLoading = false;
    });
    builder.addCase(getReservations.rejected, (state) => {
      state.user_reservations = [];
      state.contractor_reservations = [];
      state.isLoading = false;
    });
    builder.addCase(getReservations.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default reservationsSlice.reducer;
