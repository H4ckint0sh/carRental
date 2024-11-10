import React from "react";

const Footer = (props: {}) => {
  return (
    <footer className="bg-white">
      <div className="container px-4 mx-auto">
        <div className="py-6 mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center -mx-3 lg:-mx-6">
            <div className="w-full md:w-auto p-3 md:px-6">
              <a
                href="/"
                className="text-gray-500 transition hover:text-gray-500/75"
              >
                Booking
              </a>
            </div>
            <div className="w-full md:w-auto p-3 md:px-6">
              <a
                href="/admin"
                className="text-gray-500 transition hover:text-gray-500/75"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-100"></div>
      <div className="container px-4 mx-auto">
        <p className="py-6 text-md text-gray-500 font-medium">
          © 2024 H4ckint0sh. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
