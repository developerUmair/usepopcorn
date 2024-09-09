import React, { useState } from "react";
import Search from "./Search";
import Logo from "./Logo";
import Numresults from "./Numresults";

const Navbar = ({}) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <Numresults />
    </nav>
  );
};

export default Navbar;
