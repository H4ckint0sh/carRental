import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
