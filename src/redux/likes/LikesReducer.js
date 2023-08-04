import axios from 'axios';
import { getOneContractor } from '../contractors/ContractorReducer';
import endpoint from '../endpoint';

const getLikesEndpoint = `${endpoint}/v1/likes`;

const createLike = async (object, dispatch, contractorId) => {
  await axios.post(getLikesEndpoint, object);
  dispatch(getOneContractor(contractorId));
};

export const editLike = async (object, dispatch, contractorId) => {
  const editLikeEndpoint = `${getLikesEndpoint}/${object.id}`;
  await axios.patch(editLikeEndpoint, {
    like: object.like,
  });
  dispatch(getOneContractor(contractorId));
};

export const deleteLike = async (id, dispatch, contractorId) => {
  const deleteLikeEndpoint = `${getLikesEndpoint}/${id}`;
  await axios.delete(deleteLikeEndpoint);
  dispatch(getOneContractor(contractorId));
};

export default createLike;
