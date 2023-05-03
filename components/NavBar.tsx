import ThemeSwitch from "./ThemeSwitcher";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 w-full shadow-sm bg-opacity-80 bg-clip-padding backdrop-blur dark:shadow-gray-600">
      <nav className="flex items-center justify-between w-full max-w-screen-xl px-5 py-5 mx-auto lg:px-2 lg:shadow-none">
        <ThemeSwitch />
      </nav>
    </div>
  );
};

export default NavBar;
