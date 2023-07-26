import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Rating } from '@mui/material';
import { TextareaAutosize } from '@mui/base';

export default function EditReview(props) {
  const { editReviewClass, handleClose } = props;
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);
  const contractorId = useSelector((state) => state.contractors.contractorDetails.id);

  const handleSubmit = () => {
    dispatch();
  };

  return (
    <article className={editReviewClass}>
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
  reviewId: PropTypes.number.isRequired,
  editReviewClass: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
