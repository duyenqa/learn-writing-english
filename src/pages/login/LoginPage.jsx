import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function LoginPage() {
  const navigate = useNavigate();

  function handleSubmit(){
    navigate('/home');
  }
 return (
   <div className="loginPage">
    <h1>Page Login</h1>
    <Button variant="contained" onClick={handleSubmit}>Log In</Button>
   </div>
 )
};

export default LoginPage;