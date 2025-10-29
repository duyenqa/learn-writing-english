import { Routes, Route } from "react-router";
import Login from "./pages/login/LoginPage";
import SignUp from "./pages/signup/SignUpPage";
import Home from "./pages/home/FormPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App;
