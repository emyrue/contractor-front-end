import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rating, Fab } from '@mui/material';
import { PropTypes } from 'prop-types';
import ShowLikes from '../likes/showLikes';
import { deleteReview } from '../../redux/reviews/ReviewsReducer';
import UserReviewButtons from './userReviewButtons';
import '../../styles/allReviews.scss';

export default function ShowReviews(props) {
  const { reviews } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const [editDisplay, setEditDisplay] = useState(false);

  const handleDelete = (review) => {
    deleteReview(review.id, dispatch, review.contractor_id);
  };

  return (
    <section className="all-reviews">
      <h2>Reviews</h2>
      {reviews.toReversed().map((review) => {
        const {
          id,
          rating,
          review_body: reviewBody,
          user,
          likes,
          created_at: createDate,
          updated_at: editDate,
          contractor_id: contractorId,
        } = review;
        const createDateObject = (new Date(createDate)).toDateString();
        const editDateObject = (new Date(editDate)).toDateString();

        return (
          <article key={`review-${id}`}>
            <header>
              <div className="reviewer-info">
                <img className="review-picture" src={user.picture_link} alt="" />
                <div>
                  <span className="reviewer">{user.name}</span>
                  <Rating
                    value={rating}
                    readOnly
                  />
                </div>
              </div>
              <p>
                <span>
                  {createDateObject}
                  {' '}
                </span>
                { createDate !== editDate
                && (
                  <span>
                    (edited on
                    {' '}
                    {editDateObject}
                    )
                  </span>
                )}
              </p>
            </header>
            <p className="review-body">{reviewBody}</p>
            <ShowLikes likes={likes} reviewId={id} contractorId={contractorId} />
            { currentUser.id === user.id
              && (
                <UserReviewButtons
                  editDisplay={editDisplay}
                  setEditDisplay={setEditDisplay}
                  handleDelete={handleDelete}
                  review={review}
                />
              )}
            { currentUser.role === 'admin' && currentUser.id !== user.id
              && (
                <Fab
                  variant="extended"
                  onClick={() => handleDelete(review)}
                >
                  Delete
                </Fab>
              )}
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
      picture_link: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.arrayOf(PropTypes.shape({
      like: PropTypes.bool.isRequired,
    })).isRequired,
  }).isRequired).isRequired,
};
