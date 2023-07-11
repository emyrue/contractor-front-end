import { Fab } from '@mui/material';
import { PropTypes } from 'prop-types';

export default function DeleteUserContractor(props) {
  const { setDeleteDisplay, handleDelete } = props;

  return (
    <div>
      <span>
        Are you sure? This will delete all information
        {' '}
        regarding your status as a contractor,
        {' '}
        including reviews and reservations from clients.
        {' '}
        Reservations and reviews that you have made for other contractors
        {' '}
        will remain intact.
      </span>
      <form onSubmit={handleDelete}>
        <Fab
          variant="extended"
          type="submit"
        >
          Yes, delete my information
        </Fab>
        <Fab
          variant="extended"
          onClick={() => setDeleteDisplay(false)}
        >
          No, do not delete my information
        </Fab>
      </form>
    </div>
  );
}

DeleteUserContractor.propTypes = {
  setDeleteDisplay: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
