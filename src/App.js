import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/user/UserReducer';
import { getContractors } from './redux/contractors/ContractorReducer';
import Nav from './components/nav';
import LoginPage from './pages/login_page';
import SignupPage from './pages/signup_page';
import AccountPage from './pages/account_page';
import ContractorsPage from './pages/contractors_page';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getContractors());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<ContractorsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/my_account" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
