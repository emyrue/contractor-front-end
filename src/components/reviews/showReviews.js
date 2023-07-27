import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fab, Rating } from '@mui/material';
import { PropTypes } from 'prop-types';
import ShowLikes from '../likes/showLikes';
import { deleteReview } from '../../redux/reviews/ReviewsReducer';
import EditReview from './editReview';

export default function ShowReviews(props) {
  const { reviews } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const [editDisplay, setEditDisplay] = useState(false);

  const handleDelete = (review) => {
    deleteReview(review.id, dispatch, review.contractor_id);
  };

  return (
    <section>
      <h2>Reviews</h2>
      {reviews.map((review) => {
        const {
          id,
          rating,
          review_body: reviewBody,
          user,
          likes,
          contractor_id: contractorId,
        } = review;
        return (
          <article key={`review-${id}`}>
            <header>
              <span>{user.name}</span>
              <Rating
                value={rating}
                readOnly
              />
            </header>
            <p>{reviewBody}</p>
            { currentUser.id === user.id
              && (
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
                    && <EditReview reviewId={id} currentRating={rating} reviewBody={reviewBody} /> }
                </span>
              )}
            <ShowLikes likes={likes} reviewId={id} contractorId={contractorId} />
          </article>
        );
      })}
    </section>
  );
}

ShowReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    review_body: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    contractor_id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.arrayOf(PropTypes.shape({
      like: PropTypes.bool.isRequired,
    })).isRequired,
  }).isRequired).isRequired,
};
