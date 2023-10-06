import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Fab } from '@mui/material';
import { PropTypes } from 'prop-types';
import AdminDeleteContractor from '../contractors/admin_delete_contractor';
import AdminDeleteUser from './admin_delete_user';

export default function AdminPageUserDetails(props) {
  const { oneUser } = props;
  const navigate = useNavigate();
  const [deleteContractor, setDeleteContractor] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  const handleNavigate = () => {
    navigate(`/${oneUser.contractor.id}`);
  };

  const handleCloseContractor = () => {
    setDeleteContractor(false);
  };

  const handleCloseUser = () => {
    setDeleteUser(false);
  };

  return (
    <li className="one-user">
      <img alt="" src={oneUser.picture_link} />
      <ul className="user-info">
        <li>{oneUser.name}</li>
        <li>{oneUser.email}</li>
        { oneUser.contractor.id
                && (
                  <ul>
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
        <li>
          { !deleteContractor && !deleteUser
            && (
              <div>
                { oneUser.contractor.id
            && (
              <Fab
                variant="extended"
                onClick={() => setDeleteContractor(true)}
              >
                Delete Contractor
              </Fab>
            )}
                <Fab
                  variant="extended"
                  onClick={() => setDeleteUser(true)}
                >
                  Delete User
                </Fab>
              </div>
            )}
        </li>
      </ul>
      { deleteContractor
        && (
          <AdminDeleteContractor
            contractorId={oneUser.contractor.id}
            handleClose={handleCloseContractor}
          />
        )}
      { deleteUser
        && (
          <AdminDeleteUser
            userId={oneUser.id}
            handleClose={handleCloseUser}
          />
        )}
    </li>
  );
}

AdminPageUserDetails.propTypes = {
  oneUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    picture_link: PropTypes.string.isRequired,
    contractor: PropTypes.shape({
      id: PropTypes.number.isRequired,
      rate: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      number_of_reviews: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
