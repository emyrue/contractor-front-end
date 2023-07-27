import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Rating } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { editReview } from '../../redux/reviews/ReviewsReducer';

export default function EditReview(props) {
  const { reviewId, currentRating, reviewBody } = props;
  const [review, setReview] = useState(reviewBody);
  const [rating, setRating] = useState(currentRating);
  const dispatch = useDispatch();
  const contractorId = useSelector((state) => state.contractors.contractorDetails.id);

  const handleSubmit = () => {
    editReview({
      id: reviewId,
      contractor_id: contractorId,
      review_body: review,
      rating,
    }, dispatch);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Rating
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        required
      />
      <TextareaAutosize
        placeholder="Leave your review here"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <Button
        type="submit"
      >
        Submit
      </Button>
      <Button>
        Close
      </Button>
    </form>
  );
}

EditReview.propTypes = {
  reviewId: PropTypes.number.isRequired,
  currentRating: PropTypes.number.isRequired,
  reviewBody: PropTypes.string.isRequired,
};
