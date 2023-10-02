// import { useState } from 'react';
import { useSelector } from 'react-redux';
import SingleReservation from '../reservations/single_reservation';

export default function UserReservations() {
  const reservations = useSelector((state) => state.user.reservations);
  // const dispatch = useDispatch();
  // const [editDisplay, setEditDisplay] = useState(false);

  // const handleCancel = (id) => {
  //   dispatch(editReservation({
  //     user_cancelled: true,
  //     id,
  //   }));
  // };

  // const handleClear = (id) => {
  //   dispatch(deleteReservation(id));
  // };

  // const handleClose = () => {
  //   setEditDisplay('hide');
  // };

  return (
    <article>
      { reservations.filter((reservation) => !reservation.user_cancelled).length === 0
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
          { reservations.map((reservation) => <SingleReservation key={`reservation-${reservation.id}`} reservation={reservation} />) }
        </ul>
        )}
    </article>
  );
}
