import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Rating } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { createReview } from '../../redux/reviews/reviewsReducer';

export default function CreateReview(props) {
  const { createReviewClass, handleClose } = props;
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);
  const contractorId = useSelector((state) => state.contractor.contractorDetails.id);

  const handleSubmit = () => {
    dispatch(createReview({
      user_id: userId,
      contractor_id: contractorId,
      rating,
      review_body: review,
    }));
  };

  return (
    <article className={createReviewClass}>
      <form onSubmit={handleSubmit}>
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
        />
        <TextareaAutosize
          placeholder="Leave your review here"
          value={review}
          onChange={setReview}
        />
        <Button
          type="submit"
        >
          Submit
        </Button>
        <Button
          onClick={handleClose}
        >
          Close
        </Button>
      </form>
    </article>
  );
}

CreateReview.propTypes = {
  createReviewClass: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
