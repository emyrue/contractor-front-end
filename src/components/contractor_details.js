import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, editUser } from '../redux/user/UserReducer';
import { deleteContractor } from '../redux/contractors/ContractorReducer';
import ContractorForm from './contractor_form';

export default function ContractorDetails() {
  const [contractorFormDisplay, setContractorFormDisplay] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const handleClose = () => {
    setContractorFormDisplay(false);
  };

  const handleDelete = async () => {
    dispatch(editUser({
      is_contractor: false,
    }));
    dispatch(deleteContractor(userInfo.contractor.id));
    dispatch(getUser());
  };

  return (
    <div>
      <ul>
        { userInfo.user.is_contractor
          && (
          <li>
            <button onClick={handleDelete} type="button">Delete Contractor Information</button>
          </li>
          )}
        { !userInfo.user.is_contractor
          && (
          <li>
            <button onClick={() => setContractorFormDisplay(true)} type="button">Register as a Contractor</button>
          </li>
          )}
        { contractorFormDisplay
          && (
          <li>
            <ContractorForm handleClose={handleClose} />
          </li>
          )}
      </ul>
    </div>
  );
}
