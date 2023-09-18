import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Fab } from '@mui/material';
import EditUserPopup from './edit_user';
import ContractorForm from '../contractors/contractor_form';

export default function UserDetails() {
  const [nameFormDisplay, setNameFormDisplay] = useState(false);
  const [contractorFormDisplay, setContractorFormDisplay] = useState(false);
  const userInfo = useSelector((state) => state.user);

  const handleClose = () => {
    setNameFormDisplay(false);
    setContractorFormDisplay(false);
  };

  return (
    <div className="user-details">
      <h1>
        {userInfo.user.name}
        &apos;s Account
      </h1>
      <img src={userInfo.user.picture_link} alt="profile" />
      <ul className="user-list">
        <li>
          Username:
          {' '}
          {userInfo.user.name}
          {' '}
        </li>
        <li>
          Email:
          {' '}
          {userInfo.user.email}
        </li>
      </ul>
      <Fab
        onClick={() => setNameFormDisplay(true)}
        variant="extended"
      >
        Edit user info
      </Fab>
      { nameFormDisplay
        && <EditUserPopup handleClose={handleClose} />}
      { contractorFormDisplay
        && <ContractorForm handleClose={handleClose} />}
    </div>
  );
}
