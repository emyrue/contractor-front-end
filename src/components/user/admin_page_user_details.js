import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { PropTypes } from 'prop-types';

export default function AdminPageUserDetails(props) {
  const { oneUser } = props;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${oneUser.contractor.id}`);
  };

  return (
    <li>
      <h2>{oneUser.name}</h2>
      <h3>{oneUser.email}</h3>
      { oneUser.contractor.name
                && (
                  <ul>
                    <li>
                      Contractor Name:
                      {' '}
                      {oneUser.contractor.name}
                    </li>
                    <li>
                      Rate:
                      {' '}
                      $
                      {oneUser.contractor.rate}
                      /hr
                    </li>
                    <li>
                      Rating:
                      {' '}
                      {oneUser.contractor.rating}
                      {' '}
                      stars
                      (
                      {' '}
                      {oneUser.contractor.number_of_reviews}
                      {' '}
                      reviews
                      )
                    </li>
                    <li>
                      <Button
                        variant="text"
                        onClick={handleNavigate}
                      >
                        View Contractor Page
                      </Button>
                    </li>
                  </ul>
                )}
    </li>
  );
}

AdminPageUserDetails.propTypes = {
  oneUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contractor: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      number_of_reviews: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
