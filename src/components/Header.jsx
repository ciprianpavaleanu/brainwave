import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
    if (!isFormOpen) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  };

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    setFormData({
      username: "",
      email: "",
      password: "",
    });

    toggleForm();
    toggleNavigation();
    enablePageScroll();
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
          openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
          <a className="block w-[12rem] xl:mr-8" href="#hero">
            <img src={brainwave} width={190} height={40} />
          </a>

          <nav
            className={`${
              openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
              {navigation.map((item) =>
                item.onlyMobile ? (
                  <a
                    key={item.id}
                    onClick={item.id === "4" ? toggleForm : handleClick}
                    className="block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:hidden cursor-pointer"
                  >
                    {item.title}
                  </a>
                ) : (
                  <a
                    key={item.id}
                    href={item.url}
                    onClick={handleClick}
                    className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                      item.url === pathname.hash
                        ? "z-2 lg:text-n-1"
                        : "lg:text-n-1/50"
                    } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                  >
                    {item.title}
                  </a>
                )
              )}
            </div>
            <HamburgerMenu />
          </nav>

          <a
            onClick={toggleForm}
            className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block cursor-pointer"
          >
            New account
          </a>

          <Button className="hidden lg:flex" href="#login">
            Sign in
          </Button>

          <Button
            className="ml-auto lg:hidden"
            px="px-3"
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-n-7 bg-opacity-50 backdrop-blur-sm z-50"
          onClick={toggleForm}
        >
          <div
            className="bg-n-1 p-8 rounded-xl shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl mb-4 text-center">Create New Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-n-5 text-sm font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-n-5 text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-n-5 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-n-5 hover:bg-n-8 text-white rounded mr-2"
                  onClick={toggleForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-color-1 hover:bg-purple-950 text-white rounded"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
