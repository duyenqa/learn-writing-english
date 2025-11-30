import { Routes, Route } from "react-router";
import Login from "./pages/login/LoginPage";
import SignUp from "./pages/signup/SignUpPage";
import Home from "./pages/home/FormPage";
import Notes from "./pages/notes/NotesPage";
import PrivateRoute from "./routes/PrivateRoute";
import ShareSocial from './components/share/ShareSocial';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>}/>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <ShareSocial />
      <ToastContainer
          position="top-right"
          autoClose={3000}
      />
    </>
  )
}

export default App;
