import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/MessageContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import imageFlashcard from "../../assets/flashcard.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './styles.css';

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(" ");
  const [errorEmail, setErrorEmail] = useState(" ");
  const [errorPassword, setErrorPassword] = useState(" ");
  const [showPassword, setShowPassword] = useState(false);
  const { signUpUser } = useAuth();
  const { toast } = useNotification();
  const navigate = useNavigate();

  function handleChangeUsername(event) {
    setUsername(event.target.value);
    setErrorUsername(" ");
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    setErrorEmail(" ");
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    setErrorPassword(" ");
  }

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail+\.com$/;

    if (!emailRegex.test(email)) return false;

    // Lấy chuỗi local
    const localPart = email.split("@")[0];
    //chuỗi local 3 ký tự
    if (localPart.length <= 3) return false;
    // Toàn số
    if (/^\d+$/.test(localPart)) return false;

    const textFake = ["abc", "test", "demo", "user", "demouser"];
    if(textFake.includes(localPart.toLowerCase())) return false;
    return true;
  }

  const handleSubmit = async () => {
    if (!username.trim() && !email.trim() && !password.trim()) {
      setErrorUsername("Không được để trống!");
      setErrorEmail("Không được để trống!");
      setErrorPassword("Không được để trống!");
    } else if (!username.trim() && !email.trim() && !!password.trim()) {
      setErrorUsername("Không được để trống!");
      setErrorEmail("Không được để trống!");
    } else if (!!username.trim() && !!email.trim() && !password.trim()) {
      setErrorPassword("Không được để trống!");
    } else if (!username.trim() && !!email.trim() && !!password.trim()) {
      setErrorUsername("Không được để trống!");
    } else if (password.length < 8) {
      setErrorPassword("Mật khẩu phải tối thiểu 8 ký tự!");
    } else if (isValidEmail(email) == false) {
      setErrorEmail("Định dạng email không hợp lệ!");
    }else {
      const result = await signUpUser(email, password);
      if (!result.success) {
        toast.warning(result.message);
      } else {
        toast.success("Đăng ký thành công");
        navigate("/");
      }
    }
  }

  return (
    <section className="signupPage">
      <div className="introduceApp">
        <h1 className="headingText">Chào mừng đến trang tạo flashcard</h1>
        <img src={imageFlashcard} className="thumbnail flashcard" alt="flashcard" />
      </div>
      <div className="formSignup">
        <div className="title">
          <Typography variant="h4">Đăng ký</Typography>
        </div>
        <TextField
          label="Username"
          placeholder='meocon123'
          variant="standard"
          value={username}
          onChange={handleChangeUsername}
          autoComplete='off'
          required
        />
        {errorUsername && (<p className="errorMessage">{errorUsername}</p>)}
        <TextField
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
          <Link to="/">Trở lại đăng nhập</Link>
        </div>
        <Button variant="contained" onClick={handleSubmit}>Đăng Ký</Button>
      </div>
    </section>
  )
};

export default SignUpPage;