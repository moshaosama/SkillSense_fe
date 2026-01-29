import { Menu } from "lucide-react";
import { useNavbar } from "../Context/Navbar_Links.context";
import cn from "../../utils/cn";
import { Link } from "react-router";

const globalStyle = {
  border: "0.5px solid #eee",
  borderRadius: "0.75rem",
  margin: "0 10px",
  padding: "13px 5px",
  fontWeight: "bold",
};

const Navbar_Landing = () => {
  const { isOpen, toggleMenu, links } = useNavbar();
  return (
    <>
      <div className="flex justify-between p-1 items-center bg-white">
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

        <div className="flex flex-row-reverse items-center gap-5 mr-5 max-sm:hidden">
          <button className="btn-main">Login</button>

          <h1 className="text-md font-bold cursor-pointer">Sign Up</h1>
        </div>

        {/* Mobile */}

        <div className="mr-3 sm:hidden">
          <Menu strokeWidth={2.75} onClick={toggleMenu} />
        </div>
      </div>

      <div
        className={cn(
          "bg-white py-3 flex flex-col gap-2 overflow-hidden sm:hidden transition-all duration-500 ease-in-out",
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
          <button className="bg-(--main-color) hover:bg-(--hover-color) cursor-pointer mt-4 text-white font-bold text-start mx-2 rounded-xl py-3 px-5">
            Login
          </button>

          <h1 className="text-md cursor-pointer" style={globalStyle}>
            Sign Up
          </h1>
        </div>
      </div>
    </>
  );
};

export default Navbar_Landing;
