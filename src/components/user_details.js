import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, getUser } from '../redux/user/UserReducer';
import { deleteContractor } from '../redux/contractors/ContractorReducer';
import EditNamePopup from './edit_name';
import ContractorForm from './contractor_form';

export default function UserDetails() {
  const [nameFormDisplay, setNameFormDisplay] = useState(false);
  const [contractorFormDisplay, setContractorFormDisplay] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const handleClose = () => {
    setNameFormDisplay(false);
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
        <li>
          Username:
          {' '}
          {userInfo.user.name}
          {' '}
          <button onClick={() => setNameFormDisplay(true)} type="button">Edit</button>
        </li>
        <li>
          Email:
          {' '}
          {userInfo.user.email}
        </li>
        <li>
          Reservations:
          {' '}
        </li>
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
      </ul>
      { nameFormDisplay
        && <EditNamePopup handleClose={handleClose} />}
      { contractorFormDisplay
        && <ContractorForm handleClose={handleClose} />}
    </div>
  );
}
