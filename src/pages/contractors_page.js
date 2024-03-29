import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import '../styles/homepage.scss';

export default function ContractorsPage() {
  const contractorsInfo = useSelector((state) => state.contractors);
  const navigate = useNavigate();

  const redirect = (contractor) => {
    navigate(`/${contractor.id}`);
  };

  return (
    <section className="homepage-section">
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
        <ul className="all-contractors">
          {contractorsInfo.allContractors.map((contractor) => (
            <li className="one-contractor" key={`contractor-${contractor.id}`}>
              <img alt="" src={contractor.user.picture_link} />
              <br />
              <span>{contractor.user.name}</span>
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
