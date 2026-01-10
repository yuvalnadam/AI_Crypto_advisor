import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './App.css';

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
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.user.name); //saves users name
        localStorage.setItem('userEmail', email); //saves users email

        //alerting for successful login
        Swal.fire({
          icon: 'success',
          title: 'Welcome back!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });

        if (response.data.user.isFirstLogin) {
          navigate('/Onboarding');
        } 
        else {
          navigate('/Dashboard');
        }
      }
  
    } catch (error) {
      console.error("Failed connrcting to the server", error);
      
      //alerting for failed login
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'The email or password you entered is incorrect.',
        confirmButtonColor: '#14a3c3', 
        background: '#ffffff',
        customClass: {
            popup: 'my-swal-popup'
        }
      });
    }
  };

  return (
    <div className="login-page-container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-right">
            <img src="/logo.png" alt="Crypto Logo" className="logo" />
          </div>
        </div>
      </nav>
  
      <div className="hero-section">
        <img src="/back.png" className="hero-image" />
  
        <div className="login-overlay-card">
          <h2> Login </h2>
          <p className="subtitle">Enter you details to see you personalized crypto investor dashboard</p>
  
          <form onSubmit={handleSubmit} className="altshuler-form">
            <div className="input-wrapper">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={handleChangeEmail}
                placeholder="your@email.com"
                required
              />
            </div>
  
            <div className="input-wrapper">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={handleChangePassword}
                placeholder="******"
                required
              />
            </div>
            <div className="form-footer">
            <button type="submit" className="login-submit-btn">Lets go</button>
          </div>
          </form>
  
          <div className="register-redirect">
          Don't have an account? <a href="/register">Register now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;