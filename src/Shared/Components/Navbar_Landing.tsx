import { Menu } from "lucide-react";
import { useNavbar } from "../Context/Navbar_Links.context";
import cn from "../../utils/cn";
import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";

const globalStyle = {
  border: "0.5px solid #eee",
  borderRadius: "0.75rem",
  margin: "0 10px",
  padding: "13px 5px",
  fontWeight: "bold",
};

const Navbar_Landing = () => {
  const { isOpen, toggleMenu, links } = useNavbar();
  const { user, isAuthenticated, handleLogout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 z-50 w-full flex justify-between p-1 items-center bg-white/80">
        <div className="flex items-center cursor-pointer">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 object-cover"
            loading="lazy"
          />
          <h1 className="text-xl text-(--main-color) font-bold">SkillSense</h1>
        </div>

        <nav className="flex gap-12 text-md font-semibold max-sm:hidden">
          <h1 className="cursor-pointer">Features</h1>
          <h1 className="cursor-pointer">How it works</h1>
          <h1 className="cursor-pointer">Pricing</h1>
        </nav>

        {isAuthenticated ? (
          <>
            <div
              onClick={handleMobileMenuToggle}
              className="flex flex-row-reverse bg-gray-200 rounded-4xl w-fit p-2 justify-center items-center gap-2 mr-5 max-sm:hidden"
            >
              <div className="flex flex-row-reverse w-full gap-4 justify-between items-center">
                <h1 className="font-bold">{user?.data?.user_name}</h1>
                <img
                  src="person.png"
                  alt="Person"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>

            {isMobileMenuOpen && (
              <div className="absolute cursor-pointer hover:bg-gray-100 transition-all duration-200 top-16 w-40 right-0 bg-white shadow-lg rounded-md p-4">
                <h1 className="text-red-500 font-bold " onClick={handleLogout}>
                  Logout
                </h1>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-row-reverse items-center gap-5 mr-5 max-sm:hidden">
            <Link to={"/login"}>
              <button className="btn-main">Login</button>
            </Link>

            <Link to={"/signup"}>
              <h1 className="text-md font-bold cursor-pointer">Sign Up</h1>
            </Link>
          </div>
        )}

        {/* Mobile */}

        <div className="mr-3 sm:hidden">
          <Menu strokeWidth={2.75} onClick={toggleMenu} />
        </div>
      </div>

      <div
        className={cn(
          "bg-white/80 fixed w-full top-18 py-3 flex flex-col gap-2 overflow-hidden sm:hidden transition-all duration-500 ease-in-out",
          isOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0",
        )}
      >
        {links?.map((links) => (
          <Link
            to={links.href}
            key={links.name}
            className=" my-2"
            style={globalStyle}
          >
            <h1>{links.name}</h1>
          </Link>
        ))}

        <div className="flex flex-col gap-2">
          <Link to={"/login"}>
            <button className="bg-(--main-color)  hover:bg-(--hover-color) cursor-pointer mt-4 text-white font-bold text-start mx-2 rounded-xl py-3 px-5">
              Login
            </button>
          </Link>

          <Link to={"/signup"}>
            <h1 className="text-md cursor-pointer" style={globalStyle}>
              Sign Up
            </h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar_Landing;
