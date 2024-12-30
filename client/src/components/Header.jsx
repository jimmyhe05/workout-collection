import { Navbar, TextInput, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { IoIosFitness } from "react-icons/io";

export default function Header() {
  const path = useLocation().pathname;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
  ];

  return (
    <Navbar className="bg-white shadow-md border-b-2 dark:bg-gray-900 dark:border-gray-700">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center whitespace-nowrap text-lg font-semibold dark:text-white"
        aria-label="My Workout Collection Homepage"
      >
        <span className="px-2 py-1 md:hidden bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 rounded-lg text-white">
          <IoIosFitness className="w-6 h-5" />
        </span>
        <span className="hidden md:inline px-2 py-1 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 rounded-lg text-white">
          My Workout
        </span>
        <span className="ml-1 hidden md:inline dark:text-gray-300">
          Collection
        </span>
      </Link>

      {/* Search Bar */}
      <form className="hidden lg:flex items-center">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="w-72"
          aria-label="Search"
        />
      </form>

      <Button
        className="w-12 h-9 lg:hidden"
        color="gray"
        pill
        aria-label="Open Search"
      >
        <AiOutlineSearch />
      </Button>

      {/* Right Buttons */}
      <div className="flex items-center gap-4 md:order-2">
        <Button
          className="w-12 h-9 hidden sm:inline"
          color="gray"
          pill
          aria-label="Toggle Dark Mode"
        >
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="pinkToOrange" outline className="w-24 h-10">
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle aria-label="Toggle Navigation" />
      </div>

      {/* Navigation Links */}
      <Navbar.Collapse>
        {navLinks.map((link) => (
          <Navbar.Link
            key={link.to}
            as="div"
            className={`text-center py-2 ${
              path === link.to
                ? "text-orange-500 font-bold"
                : "text-gray-700 dark:text-gray-300"
            } ${
              path !== link.to &&
              "hover:bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 hover:text-white md:hover:bg-none md:hover:text-gray-700"
            }`}
          >
            <Link
              to={link.to}
              className="block w-full h-full"
              aria-label={`Navigate to ${link.label}`}
            >
              {link.label}
            </Link>
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
