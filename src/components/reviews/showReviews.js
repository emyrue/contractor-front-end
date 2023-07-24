import { Rating } from '@mui/material';
import { PropTypes } from 'prop-types';
import ShowLikes from '../likes/showLikes';

export default function ShowReviews(props) {
  const { reviews } = props;

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
              />
            </header>
            <p>{reviewBody}</p>
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
