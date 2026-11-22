
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Restaurants",
      path: "/restaurants",
    },
    {
      name: "Privacy Policy",
      path: "/privacy-policy",
    },
  ];

  return (
    <footer className="w-full bg-[#F4512C] px-6 pt-12 text-white md:px-16 lg:px-36">
      <div className="flex w-full flex-col justify-between gap-10 border-b border-white/30 pb-10 md:flex-row">

        {/* Logo & Description */}
        <div className="md:max-w-96">
          <img
            alt="Food Ordering Logo"
            className="h-11"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiLogoSquareShape.svg"
          />

          <p className="mt-6 text-sm leading-6 text-white/80">
            Discover delicious meals from your favorite restaurants and
            get them delivered straight to your doorstep.
          </p>

          {/* App Download Buttons */}
          <div className="mt-5 flex items-center gap-3">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
              alt="Google Play"
              className="h-10 w-auto rounded"
            />

            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
              alt="App Store"
              className="h-10 w-auto rounded "
            />
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-1 items-start gap-20 md:justify-end md:gap-32">

          <div>
            <h2 className="mb-5 font-bold text-white">
              Company
            </h2>

            <ul className="space-y-3 text-sm text-white/80">
              {footerLinks.map((link, id) => (
                <li key={id}>
                  <Link
                    to={link.path}
                    className="transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-5 font-bold text-white">
              Get in touch
            </h2>

            <div className="space-y-3 text-sm text-white/80">
              <p>+1-234-567-890</p>
              <p>contact@example.com</p>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <p className="py-5 text-center text-sm text-white/70">
        Copyright {new Date().getFullYear()} © Foodie. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;

