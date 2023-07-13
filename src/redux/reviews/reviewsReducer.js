import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import endpoint from '../endpoint';

const getReviewsEndpoint = `${endpoint}/v1/reviews`;

const GET_REVIEW = 'Review/GET_REVIEW';
const CREATE_REVIEW = 'Review/CREATE_REVIEW';
const DELETE_REVIEW = 'Review/DELETE_REVIEW';
const EDIT_REVIEW = 'Review/EDIT_REVIEW';

export const createReview = createAsyncThunk(CREATE_REVIEW, async (object) => {

});
