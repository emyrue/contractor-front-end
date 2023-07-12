import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fab } from '@mui/material';
import { deleteContractor } from '../../redux/contractors/ContractorReducer';
import ContractorForm from './contractor_form';
import EditContractorForm from './edit_contractor';
import DeleteUserContractor from './delete_user_contractor';
import ContractorReservations from './contractor_reservations';

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
    <div>
      <ul>
        { userInfo.contractor.name
          && (
          <div>
            <li>
              Display name:
              {' '}
              {userInfo.contractor.name}
            </li>
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
            <li>
              <ContractorReservations />
            </li>
            <li>
              <Fab
                onClick={() => setEditFormDisplay(true)}
                variant="extended"
              >
                Edit
              </Fab>
            </li>
            <li>
              <Fab
                onClick={() => setDeleteDisplay(true)}
                variant="extended"
              >
                Delete
              </Fab>
            </li>
            { deleteDisplay
              && (
              <DeleteUserContractor
                handleDelete={handleDelete}
                setDeleteDisplay={setDeleteDisplay}
              />
              )}
          </div>
          )}
        { !userInfo.contractor.name
          && (
          <li>
            <Fab
              onClick={() => setContractorFormDisplay(true)}
              variant="extended"
            >
              Register as a Contractor
            </Fab>
          </li>
          )}
        { contractorFormDisplay
          && (
          <ContractorForm handleClose1={handleClose1} />
          )}
        { editFormDisplay
          && (
          <EditContractorForm handleClose2={handleClose2} />
          )}
      </ul>
    </div>
  );
}
