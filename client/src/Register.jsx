import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleconfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //the page does not render
    setError("");

    //Check user details before registration
    if (!email || !password || !confirmPassword || !name) {
      setError("Please fill in all fields.");
      return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
  }
  if (password.length < 6) {
    setError("Password must be at least 6 characters long.");
    return;
  }
  if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
  }

    try {
      const response = await axios.post('http://localhost:3000/Register', {
        name: name,
        email: email,
        password: password
      });
  
      console.log("res", response.data);
      alert("You have succesfuly signed in");
      
      navigate('/Login'); 
  
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
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
      <label>Repeat your password:
        <input
          type="password" 
          value={confirmPassword}
          onChange={handleconfirmPassword}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Register;