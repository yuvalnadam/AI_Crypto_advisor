
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Onboarding from './Onboarding';



function App() {
  return (
    <Routes>
      {/*landing page*/}
      <Route path="/" element={<LandingPage />} />
      
      {/*registartion*/}
      <Route path="/Register" element={<Register />} />
      
      {/*login*/}
      <Route path="/login" element={<Login/>} />

      {/*Dashboard*/}
      <Route path="/Dashboard" element={<Dashboard/>} />

      {/*Onboarding*/}
      <Route path="/Onboarding" element={<Onboarding/>} />
    </Routes>
  );
}

export default App;
