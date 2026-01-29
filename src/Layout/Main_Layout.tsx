import { Outlet, useLocation } from "react-router";
import Navbar_Landing from "../Shared/Components/Navbar_Landing";
import { Navbar_Links_Provider } from "../Shared/Context/Navbar_Links.context";

const Main_Layout = () => {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === "/login" || pathname === "/signup" ? null : (
        <Navbar_Links_Provider>
          <Navbar_Landing />
        </Navbar_Links_Provider>
      )}
      <Outlet />
    </div>
  );
};

export default Main_Layout;
