import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Rating } from '@mui/material';
import createReview from '../../redux/reviews/ReviewsReducer';
import '../../styles/createReview.scss';

export default function CreateReview(props) {
  const { handleClose } = props;
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);
  const contractorId = useSelector((state) => state.contractors.contractorDetails.id);

  const handleSubmit = () => {
    dispatch(createReview({
      user_id: userId,
      contractor_id: contractorId,
      rating,
      review_body: review,
    }));
  };

  return (
    <article className="create-review">
      <form onSubmit={handleSubmit}>
        <h3>Leave a Review</h3>
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
            onClick={handleClose}
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

CreateReview.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
