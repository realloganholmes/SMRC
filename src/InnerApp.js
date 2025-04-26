import { useLocation } from 'react-router-dom';
import { AllUserProvider } from "./Utilities/allUsersContext";
import Home from './Pages/Home/home';
import PrivateRoute from './privateRoute';
import Dashboard from "./Pages/Dashboard/dashboard";
import Recaps from "./Pages/Recaps/recaps";
import RFG from "./Pages/RFG/rfg";
import Races from "./Pages/Races/races";
import Account from "./Pages/Account/account";
import Coolers from "./Pages/Coolers/coolers";
import { AuthProvider } from "./Utilities/authContext";
import Admin from "./Pages/Admin/admin";
import { SlideToggleProvider } from "./Utilities/slideToggleContext";
import { Routes, Route } from "react-router-dom";

function InnerApp() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <AuthProvider>
      <SlideToggleProvider>
        {isHomePage ? (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <AllUserProvider>
            <Routes>
              <Route path="/home" element={<PrivateRoute element={<Dashboard />} elName="home" />} />
              <Route path="/recaps" element={<PrivateRoute element={<Recaps />} elName="recaps" />} />
              <Route path="/rfg" element={<PrivateRoute element={<RFG />} elName="rfg" />} />
              <Route path="/races" element={<PrivateRoute element={<Races />} elName="races" />} />
              <Route path="/coolers" element={<PrivateRoute element={<Coolers />} elName="coolers" />} />
              <Route path="/account" element={<PrivateRoute element={<Account />} elName="account" />} />
              <Route path="/admin" element={<PrivateRoute element={<Admin />} elName="admin" />} />
            </Routes>
          </AllUserProvider>
        )}
      </SlideToggleProvider>
    </AuthProvider>
  );
}

export default InnerApp;
