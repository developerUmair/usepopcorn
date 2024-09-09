import React, { useState } from "react";
import Search from "./Search";
import Logo from "./Logo";
import Numresults from "./Numresults";

const Navbar = ({ movies }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <Numresults movies={movies} />
    </nav>
  );
};

export default Navbar;
