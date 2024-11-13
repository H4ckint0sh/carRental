import axios from "axios";
import { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToastContext } from "../context/ToastContext";
import { Booking } from "../types/common";

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastContext();

  useEffect(() => {
    const fetchRentalCars = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/bookings");
        setBookings(response.data);
        showToast("success", "Successfully fetched bookings");
      } catch (error) {
        showToast("error", "Could not fetch bookings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentalCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingSpinner color="teal" />;
  }

  return (
    <section>
      <h1 className="text-xl font-bold text-gray-900 mb-8 text-center">
        Admin Panel
      </h1>
      <AdminTable bookings={bookings} />
    </section>
  );
};

export default Admin;
