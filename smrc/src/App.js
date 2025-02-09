import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Login/login';
import Home from './Pages/Home/home';
import PrivateRoute from './privateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recaps" element={<PrivateRoute element={<Home />} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
