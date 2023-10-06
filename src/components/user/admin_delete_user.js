import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button } from '@mui/material';
import { deleteUser } from '../../redux/user/UserReducer';

export default function AdminDeleteUser(props) {
  const { userId, handleClose } = props;
  const adminId = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(deleteUser(userId, adminId));
  };

  return (
    <article>
      <section>
        <h2>Are You Sure?</h2>
        <p>
          This will delete all of this user&apos;s
          {' '}
          information, including reservations, reviews,
          {' '}
          and all contractor information.
          {' '}
          Are you sure you wish to delete this contractor?
        </p>
        <form onSubmit={handleSubmit}>
          <Button
            variant="outlined"
            type="submit"
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
          >
            Don&apos;t Delete
          </Button>
        </form>
      </section>
    </article>
  );
}

AdminDeleteUser.propTypes = {
  userId: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};
