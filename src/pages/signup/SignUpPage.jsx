import { useState, useRef } from 'react';
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
  const inputUsernameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const { signUpUser } = useAuth();
  const { toast } = useNotification();
  const navigate = useNavigate();

  function handleChangeUsername(event) {
    const valueUsername = event.target.value;
    setUsername(valueUsername.trim());
    setErrorUsername(" ");
  }

  function handleChangeEmail(event) {
    const valueEmail = event.target.value;
    setEmail(valueEmail.trim());
    setErrorEmail(" ");
  }

  function handleChangePassword(event) {
    const valuePassword = event.target.value;
    setPassword(valuePassword.trim());
    setErrorPassword(" ");
  }

  function isValidUsernameWithSpecialCharaters(username) {
    //Lọc các kí tự đặc biệt
    const regex = /^[a-zA-Z0-9\s]+$/;

    if (!regex.test(username)) return false;
    return true;
  }

  function isValidUsernameWithTextandNumbers() {
    //Chỉ chữ và số
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/;

    if (!regex.test(username)) return false;
    return true;
  }

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail+\.com$/;

    if (!emailRegex.test(email)) return false;

    // Lấy chuỗi local
    const localPart = email.split("@")[0];
    //Lấy chuỗi domain
    const domainPart = email.split("@")[1];
    //chuỗi local 3 ký tự
    if (localPart.length <= 3) return false;

    // Toàn số hoặc toàn chữ lặp lại liên tục
    if (/^(.)\1+$/.test(localPart)) return false;


    const localFake = ["abc", "abc123", "test", "demo", "user", "demouser", "abc.test"];
    const domainFake = ["gmail.vn", "facebook.vn", "facebook.com", "example.com", "yahoo.com", "outlook.com", "company.vn"];
    if (localFake.includes(localPart.toLowerCase())) return false;
    if (domainFake.includes(domainPart.toLowerCase())) return false;
    return true;
  }

  function checkValidUsername() {
    if (!username.trim()) {
      setErrorUsername("Không được để trống!");
    } else if (username?.length < 5) {
      setErrorUsername("Ít nhất 5 ký tự!!!");
    } else if (username?.length > 20) {
      setErrorUsername("Tối đa 20 ký tự!!!");
    } else {
      if (!isValidUsernameWithSpecialCharaters(username)) {
        setErrorUsername("Username không chứa ký tự đặc biệt!!!");
      }

      if (!isValidUsernameWithTextandNumbers(username)) {
        setErrorUsername("Username chứa vừa chữ và số!!!");
      }
    }
  }

  function checkValidEmail() {
    if (!email.trim()) {
      setErrorEmail("Không được để trống!");
    } else if (isValidEmail(email) == false) {
      setErrorEmail("Định dạng email không hợp lệ!");
    }
  }

  function checkValidPassword() {
    if (!password.trim()) {
      setErrorPassword("Không được để trống!");
    } else if (password.length < 8) {
      setErrorPassword("Mật khẩu phải tối thiểu 8 ký tự!");
    }
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
    } else if (username?.length < 5) {
      setErrorUsername("Ít nhất 5 ký tự!!!");
    } else if (username?.length > 20) {
      setErrorUsername("Tối đa 20 ký tự!!!");
    } else {
      if (!isValidUsernameWithSpecialCharaters(username)) {
        setErrorUsername("Username không chứa ký tự đặc biệt!!!");
      }

      if (!isValidUsernameWithTextandNumbers(username)) {
        setErrorUsername("Username chứa vừa chữ và số!!!");
      }

      if (!isValidEmail(email)) {
        setErrorEmail("Định dạng email không hợp lệ!");
      }

      if (password?.length < 8) {
        setErrorPassword("Mật khẩu phải tối thiểu 8 ký tự!");
      }

      if ((username?.length >= 5 && username?.length <= 20) && isValidEmail(email) == true && password?.length >= 8) {
        const result = await signUpUser(email, password);
        if (!result.success) {
          toast.warning(result.message);
        } else {
          toast.success("Đăng ký thành công");
          navigate("/");
        }
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
          inputRef={inputUsernameRef}
          autoFocus="true"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              checkValidUsername();
              inputEmailRef.current.focus();
            }
          }}
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
          inputRef={inputEmailRef}
          onFocus={() => {
            checkValidUsername();
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              checkValidEmail();
              inputPasswordRef.current.focus();
            }
          }}
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
          inputRef={inputPasswordRef}
          onFocus={() => {
            checkValidEmail();
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              checkValidPassword();
              handleSubmit();
            }
          }}
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