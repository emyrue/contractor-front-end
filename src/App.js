import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/nav';
import LoginPage from './pages/login_page';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
