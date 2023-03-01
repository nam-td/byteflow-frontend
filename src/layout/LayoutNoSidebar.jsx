import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarNoSearch from "../components/NavbarNoSearch"
const Layout = () => {
  return (
    <>
      <NavbarNoSearch />
      <div className="main-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
