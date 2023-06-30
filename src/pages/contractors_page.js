import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';

export default function ContractorsPage() {
  const contractorsInfo = useSelector((state) => state.contractors);
  const navigate = useNavigate();

  const redirect = (contractor) => {
    navigate(`/${contractor.id}`, { state: { contractor } });
  };

  return (
    <section>
      { contractorsInfo.isLoading
      && (
      <h1>Loading...</h1>
      )}
      { !contractorsInfo.isLoading && contractorsInfo.allContractors.length === 0
        && <h1>No Contractors have registered yet!</h1>}
      { !contractorsInfo.isLoading && !(contractorsInfo.allContractors.length === 0)
      && (
      <article>
        <h1>All Contractors</h1>
        <ul>
          {contractorsInfo.allContractors.map((contractor) => (
            <li key={`contractor-${contractor.id}`}>
              <span>{contractor.name}</span>
              <br />
              <span>{contractor.job_title}</span>
              <br />
              <span>{`Rate: $${contractor.rate}/hr`}</span>
              <br />
              <Fab
                variant="extended"
                onClick={() => redirect(contractor)}
              >
                View
              </Fab>
            </li>
          ))}
        </ul>
      </article>
      )}
    </section>
  );
}
