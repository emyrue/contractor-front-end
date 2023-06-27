import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ContractorInfoPage() {
  const [contractor, setContractor] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.state.contractor !== null) {
      setContractor(location.state.contractor);
    }
    const id = location.pathname.replace('/', '');
    console.log(id);
    console.log(contractor);
  }, []);

  return (
    <section />
  );
}
