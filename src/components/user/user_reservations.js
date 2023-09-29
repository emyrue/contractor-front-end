import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { editReservation, deleteReservation } from '../../redux/reservations/ReservationsReducer';
import EditReservation from '../reservations/edit_reservation';

export default function UserReservations() {
  const reservations = useSelector((state) => state.user.reservations);
  const dispatch = useDispatch();
  const [editDisplay, setEditDisplay] = useState('hide');

  const handleCancel = (id) => {
    dispatch(editReservation({
      user_cancelled: true,
      id,
    }));
  };

  const handleClear = (id) => {
    dispatch(deleteReservation(id));
  };

  const handleClose = () => {
    setEditDisplay('hide');
  };

  return (
    <article>
      { reservations.length === 0
        && (
          <p>
            You haven&apos;t made any reservations.
            {' '}
            Visit the contractors page to view
            {' '}
            contractors and make reservations with them.
          </p>
        )}
      { reservations.length > 0
        && (
        <ul>
          { reservations.map((reservation) => {
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
            return (
              <li className={itemClassname} key={`reservation-${id}`}>
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
                      onClick={() => setEditDisplay('edit-reservation')}
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
                <EditReservation
                  myClassName={editDisplay}
                  handleClose={handleClose}
                  id={id}
                  startingDate={reservation.start_date}
                  endingDate={reservation.end_date}
                  jobDescription={reservation.job_description}
                />
              </li>
            );
          })}
        </ul>
        )}
    </article>
  );
}
