import { PropTypes } from 'prop-types';

export default function ShowReviews(props) {
  const { reviews } = props;
  return (
    <article>
      {reviews[0].user.name}
    </article>
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
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
};
