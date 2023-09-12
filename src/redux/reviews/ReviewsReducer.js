import axios from 'axios';
import { getOneContractor } from '../contractors/ContractorReducer';

const getReviewsEndpoint = `${process.env.REACT_APP_BACKEND_ENDPOINT}/v1/reviews`;

const createReview = async (object) => {
  await axios.post(getReviewsEndpoint, object);
};

export const editReview = async (object, dispatch) => {
  await axios.patch(`${getReviewsEndpoint}/${object.id}`, {
    rating: object.rating,
    review_body: object.review_body,
  });
  dispatch(getOneContractor(object.contractor_id));
};

export const deleteReview = async (id, dispatch, contractorId) => {
  await axios.delete(`${getReviewsEndpoint}/${id}`);
  dispatch(getOneContractor(contractorId));
};

export default createReview;
