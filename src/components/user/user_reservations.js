import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

export default function UserReservations() {
  const reservations = useSelector((state) => state.user.reservations);
  const dispatch = useDispatch();

  const handleCancel = (id) => {
    dispatch(id);
  };

  const handleClear = (id) => {
    dispatch(id);
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
            status = 'Cancelled';
          } else if (approved) {
            status = 'Approved by contractor';
          }
          return (
            <li className={itemClassname} key={`reservation-${id}`}>
              <h5>{contractor.name}</h5>
              <h6>{status}</h6>
              <div>
                {reservation.start_date.toString()}
                {' '}
                -
                {' '}
                {reservation.end_date.toString()}
              </div>
              <form className={cancelClassname} onSubmit={handleCancel}>
                <Button>Cancel this reservation</Button>
              </form>
              <form className={clearClassname} onSubmit={handleClear}>
                <Button>Clear this reservation</Button>
              </form>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
