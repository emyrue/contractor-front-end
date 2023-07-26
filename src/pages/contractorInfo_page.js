import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fab, Rating } from '@mui/material';
import { getOneContractor } from '../redux/contractors/ContractorReducer';
import ReservationsPopup from '../components/reservations/reservations_popup';
import ReservationNotSaved from '../components/reservations/reservation_not_saved';
import ReservationSaved from '../components/reservations/reservation_saved';
import CreateReview from '../components/reviews/createReview';
import ShowReviews from '../components/reviews/showReviews';

export default function ContractorInfoPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [classname, setClassname] = useState('hide');
  const [createReviewClass, setCreateReviewClass] = useState('hide');
  const [leftReview, setLeftReview] = useState(false);
  const contractor = useSelector((state) => state.contractors.contractorDetails);
  const reviews = useSelector((state) => state.contractors.contractorReviews);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const id = location.pathname.replace('/', '');
    dispatch(getOneContractor(id));
  }, [dispatch, location.pathname]);

  useEffect(() => {
    setLeftReview(false);
    reviews.forEach((review) => {
      if (review.user_id === user.id) {
        setLeftReview(true);
      }
      console.log(review.user_id);
      console.log(user.id);
    });
  }, [reviews, user]);

  return (
    <section>
      <h1>{contractor.name}</h1>
      <div>
        <Rating
          readOnly
          value={parseInt(contractor.rating, 10) || 0}
        />
        <span>
          {reviews.length}
          {' '}
          review(s)
        </span>
        <Fab
          variant="extended"
        >
          View customer reviews
        </Fab>
        { !leftReview
          && (
            <Fab
              variant="extended"
              onClick={() => setCreateReviewClass('show')}
            >
              Leave a review
            </Fab>
          )}
      </div>
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
      <div className={classname}>
        <ReservationsPopup setClassname={setClassname} />
      </div>
      <CreateReview
        createReviewClass={createReviewClass}
        handleClose={() => setCreateReviewClass('hide')}
      />
      <ReservationNotSaved />
      <ReservationSaved />
      { reviews.length > 0
        && <ShowReviews reviews={reviews} /> }
    </section>
  );
}
