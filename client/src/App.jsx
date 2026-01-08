
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';


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
    </Routes>
  );
}

export default App;
