import { useState } from 'react';
import { useSelector } from 'react-redux';
import EditNamePopup from './edit_name';
import ContractorForm from './contractor_form';

export default function UserDetails() {
  const [nameFormDisplay, setNameFormDisplay] = useState(false);
  const [contractorFormDisplay, setContractorFormDisplay] = useState(false);
  const userInfo = useSelector((state) => state.user);

  const handleClose = () => {
    setNameFormDisplay(false);
    setContractorFormDisplay(false);
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
        { !userInfo.user.isContractor
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
