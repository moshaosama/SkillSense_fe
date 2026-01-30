import { Link } from "react-router-dom";
import { useNavbar } from "../Context/Navbar_Links.context";
import { Bell, Settings } from "lucide-react";
import IconRender from "./IconRender";

const globalStyle = {
  margin: "0 10px",
  padding: "13px 5px",
  fontWeight: "bold",
};

const Navbar = () => {
  const { NavLinks } = useNavbar();
  return (
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

      <div className="flex items-center">
        {NavLinks?.map((links) => (
          <Link
            to={links.href}
            key={links.name}
            className=" my-2"
            style={globalStyle}
          >
            <h1>{links.name}</h1>
          </Link>
        ))}

        <div className="mx-10">
          <div className="flex items-center gap-3">
            <IconRender icon={<Bell />} />

            <IconRender icon={<Settings />} />
          </div>
        </div>

        <div className="mr-3">
          <img
            src="person.png"
            alt="Person"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
