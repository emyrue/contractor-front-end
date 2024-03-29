import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fab, Rating, Button } from '@mui/material';
import { getOneContractor } from '../redux/contractors/ContractorReducer';
import ReservationsPopup from '../components/reservations/reservations_popup';
import ReservationNotSaved from '../components/reservations/reservation_not_saved';
import ReservationSaved from '../components/reservations/reservation_saved';
import CreateReview from '../components/reviews/createReview';
import ShowReviews from '../components/reviews/showReviews';
import '../styles/contractorInfo.scss';
import '../styles/reservationNotification.scss';
import '../styles/newReservation.scss';

export default function ContractorInfoPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newReservation, setNewReservation] = useState(false);
  const [createReview, setCreateReview] = useState(false);
  const [leftReview, setLeftReview] = useState(false);
  const isLoading = useSelector((state) => state.contractors.isLoading);
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
    });
  }, [reviews, user]);

  return (
    <section className="contractor-info-section">
      { contractor.id && !isLoading
      && (
      <section className="contractor-info">
        <h1>{contractor.user.name}</h1>
        <div className="average-rating">
          <div>
            <Rating
              readOnly
              value={parseInt(contractor.rating, 10) || 0}
            />
            <span className="review-count">
              {reviews.length}
              {' '}
              review(s)
            </span>
          </div>
          { !leftReview && !createReview
          && (
            <Fab
              variant="extended"
              onClick={() => setCreateReview(true)}
            >
              Leave a review
            </Fab>
          )}
        </div>
        { createReview
          && (
          <CreateReview
            handleClose={() => setCreateReview(false)}
          />
          )}
        <article className="contractor-info-article">
          <img alt="" src={contractor.user.picture_link} />
          <div className="contractor-info-text">
            <h2>{contractor.job_title}</h2>
            <span>
              Rate: $
              {contractor.rate}
              /hr
            </span>
            <p className="bio">{contractor.bio}</p>
            { !newReservation
          && (
            <Fab
              variant="extended"
              onClick={() => setNewReservation(true)}
            >
              Make a Reservation
            </Fab>
          )}
          </div>
        </article>
        { newReservation
          && (<div className="desktop-reservations-popup"><ReservationsPopup setNewReservation={setNewReservation} /></div>) }
        <ReservationNotSaved />
        <ReservationSaved />
        { reviews.length > 0
        && <ShowReviews reviews={reviews} /> }
      </section>
      )}
      { !contractor.id && !isLoading
        && (
          <section>
            <h1>This contrator does not exist.</h1>
            <Button
              onClick={() => navigate('/')}
            >
              Go to Home Page
            </Button>
          </section>
        )}
    </section>
  );
}
