import Logo from "./Logo";

const Navbar = ({ element }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {element}
    </nav>
  );
};

export default Navbar;
