import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, clearLoginMessage } from './redux/user/UserReducer';
import { getContractors } from './redux/contractors/ContractorReducer';
// import { getReservations } from './redux/reservations/ReservationsReducer';
import Nav from './components/nav';
import LoginPage from './pages/login_page';
import SignupPage from './pages/signup_page';
import AccountPage from './pages/account_page';
import ContractorsPage from './pages/contractors_page';
import ContractorInfoPage from './pages/contractorInfo_page';
import ReservationsPage from './pages/reservations_page';
import UsersPage from './pages/users_page';
import ResetPassword from './pages/reset_password';
import TestCloudinary from './pages/test_cloudinary';
import CloudinaryWidget from './pages/cloudinary_widget';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getContractors());
    dispatch(clearLoginMessage());
    // dispatch(getReservations());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<ContractorsPage />} />
        <Route exact path="/:contractor" element={<ContractorInfoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/my_account" element={<AccountPage />} />
        <Route path="/my_reservations" element={<ReservationsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/password/*" element={<ResetPassword />} />
        <Route path="/cloudinary" element={<TestCloudinary />} />
        <Route path="/widget" element={<CloudinaryWidget />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
