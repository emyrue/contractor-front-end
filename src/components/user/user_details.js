import { useState } from 'react';
import { useSelector } from 'react-redux';
import EditNamePopup from './edit_name';
import ContractorForm from '../contractors/contractor_form';
import UserReservations from './user_reservations';

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
        {/* <li>
          <UserReservations />
        </li> */}
      </ul>
      { nameFormDisplay
        && <EditNamePopup handleClose={handleClose} />}
      { contractorFormDisplay
        && <ContractorForm handleClose={handleClose} />}
    </div>
  );
}
