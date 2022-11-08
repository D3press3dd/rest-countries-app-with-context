import { useState, useEffect } from "react";
import MoonIcon from "../img/moon-outline.svg";
import SunIcon from "../img/sunny-outline.svg";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("theme") === "dark-theme" ? true : false
  );
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  useEffect(() => {
    localStorage.getItem("theme") === "dark-theme"
      ? document.body.classList.add("dark-theme")
      : document.body.classList.remove("dark-theme");
  }, [darkTheme]);

  const handleTheme = () => {
    setDarkTheme(previous => !previous);
    !darkTheme
      ? localStorage.setItem("theme", "dark-theme")
      : localStorage.setItem("theme", "off");
  };

  return (
    <>
      <motion.header
        className="navbar"
        initial={{
          translateY: -2000,
          opacity: 0,
        }}
        animate={{
          translateY: 0,
          opacity: 1,
        }}
      >
        <h1 onClick={handleHome} className="navbar__title">
          Where in the world?
        </h1>

        <div className="navbar__theme">
          <img
            onClick={handleTheme}
            src={darkTheme ? MoonIcon : SunIcon}
            alt="Moon icon"
          />
          <h2>Dark Mode</h2>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
