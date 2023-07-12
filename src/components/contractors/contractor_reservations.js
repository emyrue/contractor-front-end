import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { getOneContractor } from '../../redux/contractors/ContractorReducer';
import { editReservation, deleteReservation } from '../../redux/reservations/ReservationsReducer';

export default function ContractorReservations() {
  const contractorId = useSelector((state) => state.user.contractor.id);
  const reservations = useSelector((state) => state.contractors.contractorReservations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneContractor(contractorId));
  }, [contractorId]);

  const handleCancel = (id) => {
    dispatch(editReservation({
      contractor_cancelled: true,
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
          const { reservation, user } = oneReservation;
          const {
            id,
            user_cancelled: cancelled,
            contractor_cancelled: hidden,
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
              <h5>{user.name}</h5>
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
