import { Fab } from '@mui/material';
import { PropTypes } from 'prop-types';

export default function DeleteUserContractor(props) {
  const { setDeleteDisplay, handleDelete } = props;

  return (
    <article className="delete-contractor">
      <div>
        <h3>Are you sure?</h3>
        <span>
          This will delete all information
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
            Delete
          </Fab>
          <Fab
            variant="extended"
            onClick={() => setDeleteDisplay(false)}
          >
            Don&apos;t delete
          </Fab>
        </form>
      </div>
    </article>
  );
}

DeleteUserContractor.propTypes = {
  setDeleteDisplay: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
