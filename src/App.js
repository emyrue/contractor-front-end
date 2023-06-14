import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/nav';
import LoginPage from './pages/login_page';
import SignupPage from './pages/signup_page';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
