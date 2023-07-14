import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fab, Rating } from '@mui/material';
import { getOneContractor } from '../redux/contractors/ContractorReducer';
import ReservationsPopup from '../components/reservations/reservations_popup';
import ReservationNotSaved from '../components/reservations/reservation_not_saved';
import ReservationSaved from '../components/reservations/reservation_saved';
import CreateReview from '../components/reviews/createReview';

export default function ContractorInfoPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [classname, setClassname] = useState('hide');
  const [createReviewClass, setCreateReviewClass] = useState('hide');
  const contractor = useSelector((state) => state.contractors.contractorDetails);

  useEffect(() => {
    const id = location.pathname.replace('/', '');
    dispatch(getOneContractor(id));
  }, [dispatch, location.pathname]);

  return (
    <section>
      <h1>{contractor.name}</h1>
      <Rating
        readOnly
        value={contractor.rating}
      />
      <h2>{contractor.job_title}</h2>
      <p>{contractor.bio}</p>
      <span>
        Rate: $
        {contractor.rate}
        /hr
      </span>
      <br />
      <Fab
        variant="extended"
        onClick={() => setClassname('show')}
      >
        Make a Reservation
      </Fab>
      <Fab
        variant="extended"
        onClick={() => setCreateReviewClass('show')}
      >
        Leave a review
      </Fab>
      <div className={classname}>
        <ReservationsPopup setClassname={setClassname} />
      </div>
      <CreateReview
        createReviewClass={createReviewClass}
        handleClose={() => setCreateReviewClass('hide')}
      />
      <ReservationNotSaved />
      <ReservationSaved />
    </section>
  );
}
