import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/user/UserReducer';
import Nav from './components/nav';
import LoginPage from './pages/login_page';
import SignupPage from './pages/signup_page';
import CheckGetUser from './pages/checkGetUser';
import './App.css';

function App() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
    // console.log(user);
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/getuser" element={<CheckGetUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
