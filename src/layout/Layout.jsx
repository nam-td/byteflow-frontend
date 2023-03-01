import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Outlet />
        <Sidebar />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
