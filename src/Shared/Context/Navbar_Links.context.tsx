import { createContext, useState, useContext, type ReactNode } from "react";
import { href } from "react-router";

// Define context type
interface NavbarLinksContextType {
  isOpen: boolean;
  links: { name: string; href: string }[];
  handleOpen: () => void;
  handleClose: () => void;
  toggleMenu: () => void;
  setLinks: (links: { name: string; href: string }[]) => void;
  NavLinks: { name: string; href: string }[];
}

// Create context
const Navbar_Links_Context = createContext<NavbarLinksContextType | null>(null);

// Provider component
export const Navbar_Links_Provider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [links, setLinks] = useState([
    { name: "Features", href: "#Features" },
    { name: "How it works", href: "#How" },
    { name: "Pricing", href: "#Pricing" },
  ]);

  const NavLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "My Portfolios",
      href: "/my-portfolio",
    },
    {
      name: "Templates",
      href: "/templates",
    },
  ];

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <Navbar_Links_Context.Provider
      value={{
        isOpen,
        links,
        handleOpen,
        handleClose,
        toggleMenu,
        setLinks,
        NavLinks,
      }}
    >
      {children}
    </Navbar_Links_Context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNavbar = () => {
  const context = useContext(Navbar_Links_Context);
  if (!context) {
    throw new Error("useNavbar must be used within a Navbar_Links_Provider");
  }
  return context;
};
