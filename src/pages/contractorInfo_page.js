import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fab } from '@mui/material';
import { getOneContractor } from '../redux/contractors/ContractorReducer';
import ReservationsPopup from '../components/reservations_popup';

export default function ContractorInfoPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const contractor = useSelector((state) => state.contractors.contractorDetails);

  useEffect(() => {
    const id = location.pathname.replace('/', '');
    dispatch(getOneContractor(id));
  }, [dispatch, location.pathname]);

  return (
    <section>
      <h1>{contractor.name}</h1>
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
      >
        Make a Reservation
      </Fab>
      <ReservationsPopup />
    </section>
  );
}
