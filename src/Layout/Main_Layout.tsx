import { Outlet } from "react-router";
import Navbar_Landing from "../Shared/Components/Navbar_Landing";
import { Navbar_Links_Provider } from "../Shared/Context/Navbar_Links.context";

const Main_Layout = () => {
  return (
    <div>
      <Navbar_Links_Provider>
        <Navbar_Landing />
      </Navbar_Links_Provider>
      <Outlet />
    </div>
  );
};

export default Main_Layout;
