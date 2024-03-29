import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fab } from '@mui/material';
import { deleteContractor } from '../../redux/contractors/ContractorReducer';
import ContractorForm from './contractor_form';
import EditContractorForm from './edit_contractor';
import DeleteUserContractor from './delete_user_contractor';

export default function ContractorDetails() {
  const [contractorFormDisplay, setContractorFormDisplay] = useState(false);
  const [editFormDisplay, setEditFormDisplay] = useState(false);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const handleClose1 = () => {
    setContractorFormDisplay(false);
  };

  const handleClose2 = () => {
    setEditFormDisplay(false);
  };

  const handleDelete = async () => {
    dispatch(deleteContractor(userInfo.contractor.id));
  };

  return (
    <div className="contractor-details">
      { userInfo.contractor.id
      && (
      <ul className="contractor-list">
        <h2>Contractor Info</h2>
        <li>
          Profession:
          {' '}
          {userInfo.contractor.job_title}
        </li>
        <li>
          Bio:
          {' '}
          {userInfo.contractor.bio}
        </li>
        <li>
          Rate: $
          {userInfo.contractor.rate}
          /hr
        </li>
        <div className="contractor-account-buttons">
          <Fab
            onClick={() => setEditFormDisplay(true)}
            variant="extended"
          >
            Edit
          </Fab>
          <Fab
            onClick={() => setDeleteDisplay(true)}
            variant="extended"
          >
            Delete
          </Fab>
        </div>
        { deleteDisplay
              && (
              <DeleteUserContractor
                handleDelete={handleDelete}
                setDeleteDisplay={setDeleteDisplay}
              />
              )}
      </ul>
      )}
      { !userInfo.contractor.id
          && (
          <div className="contractor-registration">
            <Fab
              onClick={() => setContractorFormDisplay(true)}
              variant="extended"
            >
              Register as a Contractor
            </Fab>
          </div>
          )}
      { contractorFormDisplay
          && (
          <ContractorForm handleClose1={handleClose1} />
          )}
      { editFormDisplay
          && (
          <EditContractorForm handleClose2={handleClose2} />
          )}
    </div>
  );
}
