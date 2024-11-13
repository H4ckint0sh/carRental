import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container px-4 mx-auto">
        <div className="py-6 mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center -mx-3 lg:-mx-6">
            <div className="w-full md:w-auto p-3 md:px-6">
              <Link to="/" className="text-black transition hover:underline">
                Booking
              </Link>
            </div>
            <div className="w-full md:w-auto p-3 md:px-6">
              <Link
                to="/admin"
                className="text-black transition hover:underline"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300"></div>
      <div className="container px-4 mx-auto">
        <p className="py-6 text-md text-gray-500 font-medium">
          © 2024 h4ckint0sh. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
