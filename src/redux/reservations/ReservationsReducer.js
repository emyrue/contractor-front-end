/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import endpoint from '../endpoint';

const GET_RESERVATIONS = 'Reservations/GET_RESERVATIONS';
const CREATE_RESERVATION = 'Reservations/CREATE_RESERVATIONS';
const DELETE_RESERVATION = 'Reservations/DELETE_RESERVATIONS';

export const getReservations = createAsyncThunk(GET_RESERVATIONS, async (reservationInfo) => {

});
