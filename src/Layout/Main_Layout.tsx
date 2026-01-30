import { Outlet, useLocation } from "react-router";
import Navbar_Landing from "../Shared/Components/Navbar_Landing";
import { Navbar_Links_Provider } from "../Shared/Context/Navbar_Links.context";
import Navbar from "../Shared/Components/Navbar";

const Main_Layout = () => {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === "/login" || pathname === "/signup" ? null : (
        <Navbar_Links_Provider>
          {pathname === "/upload-cv" ? <Navbar /> : <Navbar_Landing />}
        </Navbar_Links_Provider>
      )}
      <div className="my-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Main_Layout;
