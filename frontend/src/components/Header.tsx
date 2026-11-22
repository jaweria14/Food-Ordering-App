import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import {useLocation, Link } from "react-router-dom";

const Header = () => {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Resturants", path: "/resturants" },
    ];

    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        user,
        isLoading,
    } = useAuth0();
    
     const [isScrolled, setIsScrolled] = useState(false);
 const location = useLocation();
const isHomePage = location.pathname === "/";
const isTransparent = isHomePage && !isScrolled;

 

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // NEW: profile dropdown state
    const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, [location.pathname]);

    return (
        <div>
            <nav
               className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
  isTransparent
    ? "bg-transparent py-4 md:py-5"
    : "bg-[#FFF9F3] shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
}`}
            >
                {/* Logo */}
                <h2 className="text-3xl font-extrabold text-[#F4512C]">
                    MernEats
                </h2>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-4">

                    {/* Desktop Nav */}
                    <div className="flex items-center gap-4 lg:gap-8">
                        {navLinks.map((link, i) => (
                         
                            <Link
                                key={i}
                                to={link.path}
                                className={`group flex flex-col gap-0.5 ${isTransparent
                                        ? "text-white"
                                        : "text-grey-700"
                                    }`}
                            >
                                {link.name}

                                <div
                                      className={`${
    isTransparent ? "bg-white" : "bg-gray-700"
  } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
                                />
                            </Link>
                        ))}
                    </div>
                    {!isLoading && isAuthenticated && (
                        <Link
                            to="/my-orders"
                            className={`group flex flex-col gap-0.5 ${isTransparent ? "text-white" : "text-grey-700"
                                }`}
                        >
                            Order Status

                            <div
                                className={`${isScrolled ? "bg-gray-700" : "bg-white"
                                    } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
                            />
                        </Link>
                    )}
                    {/* Authentication */}
                    {!isLoading && (
                        <>
                            {!isAuthenticated ? (
                                // LOGIN
                                <button
                                    className="px-8 py-2 rounded ml-4 bg-[#F4512C] text-white"
                                    onClick={() => {
    console.log("Login button clicked");
    loginWithRedirect()
      .then(() => console.log("Login redirect started"))
      .catch((error) => console.error("Login error:", error));
  }}
                                >
                                    Login
                                </button>
                            ) : (
                                // PROFILE
                                <div className="relative ml-4">

                                    {/* Profile Picture */}
                                    <button
                                        onClick={() =>
                                            setIsProfileOpen(!isProfileOpen)
                                        }
                                        className="focus:outline-none"
                                    >
                                        <img
                                            src={user?.picture}
                                            alt={user?.name}
                                            className="w-11 h-11 rounded-full object-cover border-2 border-[#F4512C] cursor-pointer"
                                        />
                                    </button>

                                    {/* Dropdown */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 top-14 w-56 bg-white rounded-sm shadow-lg border border-gray-100 overflow-hidden">

                                            {/* User Information */}
                                            <div className="px-4 py-4 ">
                                            <Link to="/user-profile"> <p className="font-semibold text-gray-800">
                                                    {user?.name}
                                                </p>
                                                </Link>

                                                <p className="text-sm text-gray-500 truncate pb-1">
                                                    {user?.email}
                                                </p>


                                                <hr className="w-full border-t border-gray-300 pt-2" />

                                                  <Link to="/manage-resturant"> <p className="font-semibold text-gray-800">
                                                   Manage Resturant
                                                </p>
                                                </Link>


                                            </div>

                                            {/* Logout */}
                                            <button
                                                onClick={() =>
                                                    logout({
                                                        logoutParams: {
                                                            returnTo:
                                                                window.location
                                                                    .origin,
                                                        },
                                                    })
                                                }
                                                className="w-full rounded text-center px-4 py-3 bg-[#F4512C] text-white  text-gray-700 hover:bg-gray-100 transition"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <svg
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`h-6 w-6 cursor-pointer ${isScrolled ? "text-gray-700" : "text-white"
                            }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                        }`}
                >
                    {/* Close */}
                    <button
                        className="absolute top-4 right-4"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Links */}
                    {navLinks.map((link, i) => (
                        <Link
                            key={i}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {!isLoading && isAuthenticated && (
                        <Link
                            to="/my-orders"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Order Status
                        </Link>
                    )}
                    {/* Mobile Authentication */}
                    {!isLoading && (
                        <>
                            {!isAuthenticated ? (
                                <button
                                    className="bg-[#F4512C] text-white px-8 py-2.5 rounded"
                                    onClick={() => loginWithRedirect()}
                                >
                                    Login
                                </button>
                            ) : (
                                <div className="flex flex-col items-center gap-3">

                                    {/* Profile Picture */}
                                    <img
                                        src={user?.picture}
                                        alt={user?.name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-[#F4512C]"
                                    />

                                    <p className="font-semibold text-gray-700">
                                        {user?.name}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {user?.email}
                                    </p>

                                    <button
                                        className="bg-[#F4512C] text-white px-8 py-2.5 rounded"
                                        onClick={() =>
                                            logout({
                                                logoutParams: {
                                                    returnTo:
                                                        window.location.origin,
                                                },
                                            })
                                        }
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;