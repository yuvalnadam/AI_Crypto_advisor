import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate(); 
  
  const handleButtonClick = () => {
  };

  return (
    <div className="container">
      <h1>Header</h1>
      <button onClick={handleButtonClick}>click here</button>
    </div>
  );
}

export default MyComponent;