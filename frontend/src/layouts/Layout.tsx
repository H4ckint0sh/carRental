import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";
import Toast from "../components/ToastMessage";

function Layout() {
  const { toast } = useToastContext();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 flex-1">
        {toast && <Toast severity={toast.severity} message={toast.message} />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
