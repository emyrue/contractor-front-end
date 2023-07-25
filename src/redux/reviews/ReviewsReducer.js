import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import endpoint from '../endpoint';

const getReviewsEndpoint = `${endpoint}/v1/reviews`;

const CREATE_REVIEW = 'Reviews/CREATE_REVIEW';

const createReview = createAsyncThunk(CREATE_REVIEW, async (object) => {
  await axios.post(getReviewsEndpoint, object);
});

export default createReview;
