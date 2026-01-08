import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleChangeEmail = (e) => {
    setName(e.target.value);
  };
  const handleChangeName = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form>
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
    </form>
  );
}

export default Register;