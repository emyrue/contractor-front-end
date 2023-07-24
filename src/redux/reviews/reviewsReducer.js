/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import endpoint from '../endpoint';

const getReviewsEndpoint = `${endpoint}/v1/reviews`;

const GET_REVIEW = 'Reviews/GET_REVIEW';
const CREATE_REVIEW = 'Reviews/CREATE_REVIEW';
const DELETE_REVIEW = 'Reviews/DELETE_REVIEW';
const EDIT_REVIEW = 'Reviews/EDIT_REVIEW';

export const createReview = createAsyncThunk(CREATE_REVIEW, async (object) => {
  await axios.post(getReviewsEndpoint, object);
});
