import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fab } from '@mui/material';
import { getOneContractor } from '../redux/contractors/ContractorReducer';

export default function ContractorInfoPage() {
  const [contractor, setContractor] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.contractors.contractorDetails);

  useEffect(() => {
    if (location.state !== null) {
      setContractor(location.state.contractor);
    } else if (contractor.id === undefined) {
      const id = location.pathname.replace('/', '');
      dispatch(getOneContractor(id));
      setContractor(state);
    }
  }, [contractor, dispatch, location.pathname, location.state, state]);

  return (
    <section>
      <h1>{contractor.name}</h1>
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
    </section>
  );
}
