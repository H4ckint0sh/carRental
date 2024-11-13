import axios from "axios";
import { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
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
    return (
      <span className="flex items-center justify-center h-96">
        <svg
          className="animate-spin h-8 w-8 text-teal-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={4}
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </span>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Admin Panel</h2>
      <AdminTable bookings={bookings} />
    </div>
  );
};

export default Admin;
