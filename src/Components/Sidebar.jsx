import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => {
  return (
    <>
      <div className="mt-10">
        {links.map((link) => (
          <>
            <NavLink
              key={link.name}
              to={link.to}
              onClick={() => handleClick && handleClick()}
              className="flex flex-row
              justify-start items-center
              my-8 font-medium text-gray-400
              hover:text-cyan-400"
            >
              <link.icon className="w-6 h-6 mr-2" />
              {link.name}
            </NavLink>
          </>
        ))}
      </div>
    </>
  );
};

function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex flex-col py-10 px-4 w-[240px] bg-[#191624]">
        <img src={logo} className="w-full h-14 object-contain" alt="logo" />
        <NavLinks />
      </div>

      <div className="absolute block md:hidden top-6 right-3">
        {mobileMenuOpen ? (
          <>
            <RiCloseLine className="w-6 h-6 text-white mr-2 cursor-pointer" 
            onClick={() => setMobileMenuOpen(false)}
            />
          </>
        ) : (
          <>
            <HiOutlineMenu className="w-6 h-6 text-white mr-2 cursor-pointer" 
            onClick={() => setMobileMenuOpen(true)}
            />
          </>
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10
        to-[#483d8b] backdrop-blur-lg z-10 p-6
        md-hidden transition-all ${
        mobileMenuOpen ? `left-0` : `-left-full`
        }`}
      >
        <img src={logo} className="w-full h-14 object-contain" alt="logo" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
}

export default Sidebar;
