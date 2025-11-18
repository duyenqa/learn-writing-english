import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/MessageContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
  const [showPopup, setShowPopup] = useState(false);
  const { signUpUser } = useAuth();
  const { toast } = useNotification();

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
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
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
    } else if (!isValidEmail(email)) {
      setErrorEmail("Định dạng email không hợp lệ!");
    } else {
      const result = await signUpUser(email, password);
      if (!result.success) {
        setShowPopup(false);
        toast.warning(result.message);
      } else {
        setShowPopup(true);
        toast.success("Đăng ký thành công");
      }
    }
  }

  return (
    <section className="signupPage">
      {showPopup == false ? (
        <>
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
        </>
      ) : (
        <Card>
          <CardContent sx={{ height: '100%' }}>
            <Typography variant="body2" color="text.secondary">
              Bạn đi đến hộp thư email để xác thực và đăng nhập. Cảm ơn!!!
            </Typography>
          </CardContent>
        </Card>
      )}
    </section>
  )
};

export default SignUpPage;