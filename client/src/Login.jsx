import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleChangeEmail= (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //the page does not render
    
    try {
      const response = await axios.post('http://localhost:3000/Login', {
        email: email,
        password: password
      });
  
      console.log("res", response.data);
      alert("You have succesfuly logged in!");
      
      if (response.status === 200) {
        localStorage.setItem('userName', response.data.user.name); //saves users name
        localStorage.setItem('userEmail', email); //saves users email
        
        if (response.data.user.isFirstLogin) {
          navigate('/Onboarding');
        } 
        else {
          navigate('/Dashboard');
        }
      }
  
    } catch (error) {
      console.error("Something went wrong", error);
      alert("Failed connrcting to the server");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;