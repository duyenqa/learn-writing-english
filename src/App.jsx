import { Routes, Route } from "react-router";
import Login from "./pages/login/LoginPage";
import Home from "./pages/home/FormPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App;
