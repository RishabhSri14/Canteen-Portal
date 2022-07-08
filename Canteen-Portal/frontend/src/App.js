import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import NavbarUser from "./components/templates/NavbarUser";
import NavbarVendor from "./components/templates/NavbarVendor";
import ProfileUser from "./components/users/ProfileUser";
import ProfileUserDash from "./components/users/Dashboard";
import ProfileUserEdit from "./components/users/Edit";
import ProfileUserOrder from "./components/users/Orders";
import ProfileUserAddMoney from "./components/users/AddMoney";


import ProfileVendor from "./components/vendors/ProfileVendor";
import ProfileVendorDash from "./components/vendors/Dashboard";
import ProfileVendorEdit from "./components/vendors/Edit";
import ProfileVendorMenu from "./components/vendors/Menu";
import ProfileVendorMenuAdd from "./components/vendors/MenuAdd";
import ProfileVendorMenuEdit from "./components/vendors/MenuEdit";

import ProfileVendorStats from "./components/vendors/Stats";


const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />{/*Used to fix navbar by allowing child route*/}
      </div>
    </div>
  );
};
const LayoutUser = () => {
  return (
    <div>
      <NavbarUser />
      <div className="container">
        <Outlet />{/*Used to fix navbar by allowing child route*/}
      </div>
    </div>
  );
};
const LayoutVendor = () => {
  return (
    <div>
      <NavbarVendor />
      <div className="container">
        <Outlet />{/*Used to fix navbar by allowing child route*/}
      </div>
    </div>
  );
};

// If a page need to be shown at frontend must be put here
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        
        <Route path="/profileUser" element = {<LayoutUser />} >
          <Route path="/profileUser" element={<ProfileUser />} />
          <Route path="/profileUser/dashboard" element={<ProfileUserDash />} />
          <Route path="/profileUser/orders" element={<ProfileUserOrder />} />
          <Route path="/profileUser/addMoney" element={<ProfileUserAddMoney />} />
          <Route path="/profileUser/edit" element={<ProfileUserEdit />} />
          
        </Route>
        <Route path="/profileVendor" element={<LayoutVendor />} >
          <Route path="/profileVendor" element={<ProfileVendor />} />
          <Route path="/profileVendor/stats" element={<ProfileVendorStats />} />
          <Route path="/profileVendor/dashboard" element={<ProfileVendorDash />} />
          <Route path="/profileVendor/menu" element={<ProfileVendorMenu />} />
          <Route path="/profileVendor/menuAdd" element={<ProfileVendorMenuAdd />} />
          <Route path="/profileVendor/menuEdit" element={<ProfileVendorMenuEdit />} />
          <Route path="/profileVendor/edit" element={<ProfileVendorEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
