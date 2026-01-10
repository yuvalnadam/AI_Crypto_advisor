import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Swal from 'sweetalert2';


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
      Swal.fire({
        icon: 'warning', 
        title: 'Missing Details',
        text: 'Please fill in all fields to create your account',
        confirmButtonColor: '#14a3c3',
        customClass: { popup: 'my-swal-popup' }
      });
      return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Email',
      text: 'Please enter a valid email address',
      confirmButtonColor: '#14a3c3'
    });
      return;
  }
  if (password.length < 6) {
    Swal.fire({
      icon: 'warning',
      title: 'Weak Password',
      text: 'Password must be at least 6 characters',
      confirmButtonColor: '#14a3c3'
    });
    return;
  }
  if (password !== confirmPassword) {
    Swal.fire({
      icon: 'warning',
      title: 'Mismatch',
      text: 'Passwords do not match. Please try again',
      confirmButtonColor: '#14a3c3'
    });
      return;
  }

    try {
      const response = await axios.post('http://localhost:3000/Register', {
        name: name,
        email: email,
        password: password
      });
      //success message
      Swal.fire({
        icon: 'success',
        title: 'Welcome aboard!',
        text: 'Your account has been created successfully.',
        timer: 2000,
        showConfirmButton: false
      });
      
      navigate('/Login'); 

    } catch (err) {
      
      //failed message

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.response?.data?.message || "Something went wrong on our end.",
        confirmButtonColor: '#ff4757'
      });
    }
  };

  return (
    <div className="login-page-container">
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