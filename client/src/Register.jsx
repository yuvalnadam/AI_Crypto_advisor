import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';


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
      setError("Please fill in all fields");
      return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
  }
  if (password.length < 6) {
    setError("Password must be at least 6 characters long");
    return;
  }
  if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
  }

    try {
      const response = await axios.post('http://localhost:3000/Register', {
        name: name,
        email: email,
        password: password
      });
  
      console.log("res", response.data);
      
      navigate('/Login'); 
  
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* 1.Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-right">
            <img src="/logo.png" alt="Crypto Logo" className="logo" />
          </div>
        </div>
      </nav>
  
      <div className="hero-section">
        <img src="/reg.png" alt="Register Background" className="hero-image" />
  
        <div className="login-overlay-card">
          <h2 className="login-title">Create Account</h2>
          <p className="login-desc">Start your crypto journey today</p>
  
          {error && <p style={{ color: 'red', fontWeight: 'bold', fontSize: '0.8rem' }}>{error}</p>}
  
          <form onSubmit={handleSubmit} className="altshuler-form">
            <div className="input-wrapper">
              <input
                type="text" 
                placeholder="Full Name"
                value={name}
                onChange={handleChangeName}
                required
              />
            </div>
  
            <div className="input-wrapper">
              <input
                type="email" 
                placeholder="Email Address"
                value={email}
                onChange={handleChangeEmail}
                required
              />
            </div>
  
            <div className="input-wrapper">
              <input
                type="password" 
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
                required
              />
            </div>
  
            <div className="input-wrapper">
              <input
                type="password" 
                placeholder="Repeat Password"
                value={confirmPassword}
                onChange={handleconfirmPassword}
                required
              />
            </div>
  
            <div className="form-footer">
              <button type="submit" className="login-submit-btn">Sign Up</button>
            </div>
          </form>
  
          <div className="register-redirect">
            Already have an account? <a href="/login">Go back to login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;