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
  }, [contractorId, dispatch]);

  const handleCancel = (id) => {
    dispatch(editReservation({
      contractor_cancelled: true,
      id,
    }));
  };

  const handleClear = (id) => {
    dispatch(deleteReservation(id));
  };

  const handleApprove = (id) => {
    dispatch(editReservation({
      approved: true,
      id,
    }));
  };

  return (
    <article>
      <h2>Reservations Made by Other Users</h2>
      { reservations.length === 0
        && (
          <p>
            No reservations yet.
            {' '}
            Check back for updates.
          </p>
        )}
      { reservations.length >= 0
        && (
        <ul>
          { reservations.map((reservation) => {
            const {
              id,
              user_cancelled: cancelled,
              contractor_cancelled: hidden,
              approved,
              user,
              job_description: jobDescription,
            } = reservation;
            let itemClassname = 'show';
            let cancelClassname = 'show';
            let clearClassname = 'hide';
            let status = 'Pending your approval';
            let approvalClassname = 'show';
            if (hidden) {
              itemClassname = 'hide';
            } else if (cancelled) {
              cancelClassname = 'hide';
              clearClassname = 'show';
              approvalClassname = 'hide';
              status = 'Cancelled by user';
            } else if (approved) {
              status = 'Approved';
              approvalClassname = 'hide';
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
                <p>{jobDescription}</p>
                <form className={cancelClassname} onSubmit={() => handleCancel(id)}>
                  <Button
                    type="submit"
                  >
                    Reject/cancel this reservation
                  </Button>
                </form>
                <form className={clearClassname} onSubmit={() => handleClear(id)}>
                  <Button
                    type="submit"
                  >
                    Clear this reservation
                  </Button>
                </form>
                <form className={approvalClassname} onSubmit={() => handleApprove(id)}>
                  <Button
                    type="submit"
                  >
                    Approve
                  </Button>
                </form>
              </li>
            );
          })}
        </ul>
        )}
    </article>
  );
}
