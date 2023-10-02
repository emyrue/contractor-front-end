import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import { editReservation, deleteReservation } from '../../redux/reservations/ReservationsReducer';
import EditReservation from './edit_reservation';

export default function SingleReservation(props) {
  const { reservation } = props;
  const {
    id,
    contractor_cancelled: cancelled,
    user_cancelled: hidden,
    approved,
    contractor,
    start_date: startDate,
    end_date: endDate,
    job_description: jobDescription,
  } = reservation;
  let itemClassname = 'show';
  let cancelClassname = 'show';
  let clearClassname = 'hide';
  let editClassname = 'show';
  let status = 'Pending approval from contractor';
  if (hidden) {
    itemClassname = 'hide';
  } else if (cancelled) {
    cancelClassname = 'hide';
    clearClassname = 'show';
    editClassname = 'hide';
    status = 'Cancelled by contractor';
  } else if (approved) {
    status = 'Approved by contractor';
  }
  const dispatch = useDispatch();
  const [editDisplay, setEditDisplay] = useState(false);

  const handleClose = () => {
    setEditDisplay(false);
  };

  const handleClear = (id) => {
    dispatch(deleteReservation(id));
  };

  const handleCancel = (id) => {
    dispatch(editReservation({
      user_cancelled: true,
      id,
    }));
  };

  return (
    <li className={itemClassname}>
      <h5>
        Reservation with
        {' '}
        {contractor.name}
      </h5>
      <h6>
        Status:
        {' '}
        {status}
      </h6>
      <p>
        Date:
        {' '}
        {startDate.toString().split('-').join('/')}
        {' '}
        &mdash;
        {' '}
        {endDate.toString().split('-').join('/')}
      </p>
      <p>
        Description:
        {' '}
        {jobDescription}
      </p>
      <div className="buttons">
        <form className={editClassname}>
          <Button
            variant="outlined"
            onClick={() => setEditDisplay(true)}
          >
            Edit
          </Button>
        </form>
        <form className={cancelClassname} onSubmit={() => handleCancel(id)}>
          <Button
            variant="outlined"
            type="submit"
          >
            Cancel
          </Button>
        </form>
        <form className={clearClassname} onSubmit={() => handleClear(id)}>
          <Button
            variant="outlined"
            type="submit"
          >
            Clear
          </Button>
        </form>
      </div>
      { editDisplay
                  && (
                    <EditReservation
                      handleClose={handleClose}
                      id={id}
                      startingDate={reservation.start_date}
                      endingDate={reservation.end_date}
                      jobDescription={reservation.job_description}
                      contractorId={contractor.id}
                    />
                  )}
    </li>
  );
}

SingleReservation.propTypes = {
  reservation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    contractor_cancelled: PropTypes.bool.isRequired,
    user_cancelled: PropTypes.bool.isRequired,
    approved: PropTypes.bool.isRequired,
    contractor: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    job_description: PropTypes.string.isRequired,
  }).isRequired,
};
