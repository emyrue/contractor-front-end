import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { editReservation, deleteReservation } from '../../redux/reservations/ReservationsReducer';

export default function UserReservations() {
  const reservations = useSelector((state) => state.user.reservations);
  const dispatch = useDispatch();

  const handleCancel = (id) => {
    dispatch(editReservation({
      user_cancelled: true,
      id,
    }));
  };

  const handleClear = (id) => {
    dispatch(deleteReservation(id));
  };

  return (
    <article>
      <h2>Reservations</h2>
      <ul>
        { reservations.map((oneReservation) => {
          const { reservation, contractor } = oneReservation;
          const {
            id,
            contractor_cancelled: cancelled,
            user_cancelled: hidden,
            approved,
          } = reservation;
          let itemClassname = 'show';
          let cancelClassname = 'show';
          let clearClassname = 'hide';
          let status = 'Pending approval from contractor';
          if (hidden) {
            itemClassname = 'hide';
          } else if (cancelled) {
            cancelClassname = 'hide';
            clearClassname = 'show';
            status = 'Cancelled by contractor';
          } else if (approved) {
            status = 'Approved by contractor';
          }
          return (
            <li className={itemClassname} key={`reservation-${id}`}>
              <h5>{contractor.name}</h5>
              <h6>
                Status:
                {' '}
                {status}
              </h6>
              <div>
                {reservation.start_date.toString()}
                {' '}
                -
                {' '}
                {reservation.end_date.toString()}
              </div>
              <form className={cancelClassname} onSubmit={() => handleCancel(id)}>
                <Button
                  type="submit"
                >
                  Cancel this reservation
                </Button>
              </form>
              <form className={clearClassname} onSubmit={() => handleClear(id)}>
                <Button>Clear this reservation</Button>
              </form>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
