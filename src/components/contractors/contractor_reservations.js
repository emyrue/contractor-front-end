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
            let cancelClassname = 'hide';
            let clearClassname = 'hide';
            let rejectClassname = 'show';
            let status = 'Pending your approval';
            let approvalClassname = 'show';
            if (hidden) {
              itemClassname = 'hide';
            } else if (cancelled) {
              cancelClassname = 'hide';
              clearClassname = 'show';
              approvalClassname = 'hide';
              rejectClassname = 'hide';
              status = 'Cancelled by user';
            } else if (approved) {
              status = 'Approved';
              approvalClassname = 'hide';
              rejectClassname = 'hide';
              cancelClassname = 'show';
            }
            return (
              <li className={itemClassname} key={`reservation-${id}`}>
                <h5>
                  Reservation with
                  {' '}
                  {user.name}
                </h5>
                <h6>
                  Status:
                  {' '}
                  {status}
                </h6>
                <p>
                  Date:
                  {' '}
                  {reservation.start_date.toString()}
                  {' '}
                  &mdash;
                  {' '}
                  {reservation.end_date.toString()}
                </p>
                <p>{jobDescription}</p>
                <div className="buttons">
                  <form className={rejectClassname} onSubmit={() => handleCancel(id)}>
                    <Button
                      variant="outlined"
                      type="submit"
                    >
                      Reject
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
                  <form className={approvalClassname} onSubmit={() => handleApprove(id)}>
                    <Button
                      variant="outlined"
                      type="submit"
                    >
                      Approve
                    </Button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
        )}
    </article>
  );
}
