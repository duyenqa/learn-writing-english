import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {useNotification} from '../../context/MessageContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './styles.css';

function LoginPage() {
  const navigate = useNavigate();
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[errorEmail, setErrorEmail] = useState(" ");
  const[errorPassword, setErrorPassword] = useState(" ");
  const[showPassword, setShowPassword] = useState(false);
  const{ signInUser } = useAuth();
  const {toast} = useNotification();

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    setErrorEmail(" ");
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    setErrorPassword(" ");
  }

  function isValidEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async () => {
    if(!email.trim() && !password.trim()){
      setErrorEmail("Không được để trống!");
      setErrorPassword("Không được để trống!");
    }else if(!email.trim() && !!password.trim()){
      setErrorEmail("Không được để trống!");
    }else if(!!email.trim() && !password.trim()){
      setErrorPassword("Không được để trống!");
    }else if (password.length < 8) {
      setErrorPassword("Mật khẩu phải tối thiểu 8 ký tự!");
    }else if(!isValidEmail(email)){
      setErrorEmail("Định dạng email không hợp lệ!");
    }else{
      try {
        const result = await signInUser(email, password);
        if (result.success) {
          navigate("/home");
        }else{
          toast.warning(result.error);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  return (
    <section className="loginPage">
      <div className="formLogin">
        <TextField
          id="standard-basic"
          label="Email"
          placeholder="your_email@gmail.com"
          variant="standard"
          value={email}
          onChange={handleChangeEmail}
          autoComplete='off'
          required
        />
        {errorEmail && (<p className="errorMessage">{errorEmail}</p>)}
        <TextField
          id="standard-password-input"
          label="Password"
          placeholder='Enter password'
          type={showPassword ? 'text' : 'password'}
          autoComplete="off"
          variant="standard"
          value={password}
          onChange={handleChangePassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />
        {errorPassword && (<p className="errorMessage">{errorPassword}</p>)}

        <div className="link">
          <Link to="/sign-up">Đăng ký tài khoản</Link>
        </div>
        <Button variant="contained" onClick={handleSubmit}>Đăng Nhập</Button>
      </div>
    </section>
  )
};

export default LoginPage;