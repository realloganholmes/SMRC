import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Login/login';
import Dashboard from './Pages/dashboard';
import PrivateRoute from './privateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
