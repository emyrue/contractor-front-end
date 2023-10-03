import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Rating } from '@mui/material';
import { editReview } from '../../redux/reviews/ReviewsReducer';
import '../../styles/createReview.scss';

export default function EditReview(props) {
  const {
    reviewId, currentRating, reviewBody, setEditDisplay,
  } = props;
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
    <article className="create-review">
      <form onSubmit={handleSubmit}>
        <h3>Edit your Review</h3>
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          required
        />
        <textarea
          placeholder="Leave your review here"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <div>
          <Button
            variant="outlined"
            onClick={() => setEditDisplay(false)}
          >
            Close
          </Button>
          <Button
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </article>
  );
}

EditReview.propTypes = {
  reviewId: PropTypes.number.isRequired,
  currentRating: PropTypes.number.isRequired,
  reviewBody: PropTypes.string.isRequired,
  setEditDisplay: PropTypes.func.isRequired,
};
