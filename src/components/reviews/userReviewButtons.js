import { Fab } from '@mui/material';
import { PropTypes } from 'prop-types';
import EditReview from './editReview';

export default function UserReviewButtons(props) {
  const {
    editDisplay,
    setEditDisplay,
    handleDelete,
    review,
  } = props;

  return (
    <span>
      <Fab
        variant="extended"
        onClick={() => setEditDisplay(true)}
      >
        Edit Review
      </Fab>
      <Fab
        variant="extended"
        onClick={() => handleDelete(review)}
      >
        Delete Review
      </Fab>
      { editDisplay
        && (
          <EditReview
            reviewId={review.id}
            currentRating={review.rating}
            reviewBody={review.review_body}
            setEditDisplay={setEditDisplay}
          />
        )}
    </span>
  );
}

UserReviewButtons.propTypes = {
  editDisplay: PropTypes.bool.isRequired,
  setEditDisplay: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    contractor_id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    review_body: PropTypes.string.isRequired,
  }).isRequired,
};
