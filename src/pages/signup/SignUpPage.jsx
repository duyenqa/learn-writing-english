import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './styles.css';

function SignUpPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState(" ");
    const [errorPassword, setErrorPassword] = useState(" ");

    function handleChangeEmail(event) {
        setEmail(event.target.value);
        setErrorEmail(" ");
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
        setErrorPassword(" ");
    }

    function handleSubmit() {
    if(!email.trim() && !password.trim()){
      setErrorEmail("Không được để trống!");
      setErrorPassword("Không được để trống!");
    }else if(!email.trim() && !!password.trim()){
      setErrorEmail("Không được để trống!");
    }else if(!!email.trim() && !password.trim()){
      setErrorPassword("Không được để trống!");
    }else{
      navigate('/');
      console.log(email, password);
    }
  }
    return (
        <section className="signupPage">
            <div className="formSignup">
                <TextField
                    id="standard-basic"
                    label="Email"
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
                    type="password"
                    autoComplete="off"
                    variant="standard"
                    value={password}
                    onChange={handleChangePassword}
                    required
                />
                {errorPassword && (<p className="errorMessage">{errorPassword}</p>)}

                <div className="link">
                  <Link to="/">Trở lại</Link>
                </div>
                <Button variant="contained" onClick={handleSubmit}>Đăng Ký</Button>
            </div>
        </section>
    )
};

export default SignUpPage;