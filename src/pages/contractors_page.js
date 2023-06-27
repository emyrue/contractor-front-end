import { useSelector } from 'react-redux';
import { Fab } from '@mui/material';

export default function ContractorsPage() {
  const contractorsInfo = useSelector((state) => state.contractors);

  return (
    <section>
      { contractorsInfo.isLoading
      && (
      <h1>Loading...</h1>
      )}
      { !contractorsInfo.isLoading
      && (
      <article>
        <h1>All Contractors</h1>
        <ul>
          {contractorsInfo.allContractors.map((contractor) => (
            <li key={`contractor-${contractor.id}`}>
              <span>{contractor.name}</span>
              <br />
              <span>{contractor.bio}</span>
              <br />
              <Fab variant="extended">View</Fab>
            </li>
          ))}
        </ul>
      </article>
      )}
    </section>
  );
}
