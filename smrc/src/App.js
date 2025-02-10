import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Pages/Home/home';
import PrivateRoute from './privateRoute';
import Dashboard from "./Pages/Dashboard/dashboard";
import Recaps from "./Pages/Recaps/recaps";
import RFG from "./Pages/RFG/rfg";
import Races from "./Pages/Races/races";
import Coolers from "./Pages/Coolers/coolers";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/recaps" element={<PrivateRoute element={<Recaps />} />} />
        <Route path="/rfg" element={<PrivateRoute element={<RFG />} />} />
        <Route path="/races" element={<PrivateRoute element={<Races />} />} />
        <Route path="/coolers" element={<PrivateRoute element={<Coolers />} />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;