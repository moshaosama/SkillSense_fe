import { Outlet, useLocation } from "react-router";
import Navbar_Landing from "../Shared/Components/Navbar_Landing";
import { Navbar_Links_Provider } from "../Shared/Context/Navbar_Links.context";
import Navbar from "../Shared/Components/Navbar";
import LiveChat from "../Shared/Components/LiveChat";
import Footer from "../Shared/Components/Footer";
import ScrollToTop from "../Shared/Utils/ScrollToTop";

const Main_Layout = () => {
  const { pathname } = useLocation();
  const isAuth = pathname === "/login" || pathname === "/signup";

  return (
    <div>
      <ScrollToTop />
      {!isAuth && (
        <Navbar_Links_Provider>
          {pathname === "/upload-cv" ? <Navbar /> : <Navbar_Landing />}
        </Navbar_Links_Provider>
      )}
      <div className={isAuth ? "" : "pt-0"}>
        <Outlet />
      </div>
      {/* Global floating live chat widget */}
      {!isAuth && <LiveChat />}
      
      {/* Footer displayed on non-auth pages */}
      {!isAuth && <Footer />}
    </div>
  );
};

export default Main_Layout;
