
import { useState } from 'react'; // manage the data
import { useNavigate } from 'react-router-dom'; // moving between pages

function LandingPage() {
  const navigate = useNavigate(); 

  return (
    <div className="container">
      <h1>Welcome</h1>
      <button onClick={() => navigate('/Login')}>Login</button>
      <button onClick={() => navigate('/Register')}>Register Here</button>
    </div>
  );
}

export default LandingPage;