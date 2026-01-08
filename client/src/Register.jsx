import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //the page does not render
    
    try {
      const response = await axios.post('http://localhost:3000/Register', {
        name: name,
        email: email,
        password: password
      });
  
      console.log("res", response.data);
      alert("You have succesfuly signed in");
      
      navigate('/Login'); 
  
    } catch (error) {
      console.error("Something went wrong", error);
      alert("Failed connrcting to the server");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input
          type="text" 
          value={name}
          onChange={handleChangeName}
        />
      </label>
      <label>Enter your email:
        <input
          type="text" 
          value={email}
          onChange={handleChangeEmail}
        />
      </label>
      <label>Enter your password:
        <input
          type="password" 
          value={password}
          onChange={handleChangePassword}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Register;