import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    <section />
  );
}
