import axios from "axios";
import { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import { useToastContext } from "../context/ToastContext";
import { Booking } from "../types/common";

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { showToast } = useToastContext();

  useEffect(() => {
    const fetchRentalCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bookings");
        setBookings(response.data);
        showToast("success", "Successfully fetched bookings");
      } catch (error) {
        showToast("error", "Could not fetch bookings");
      }
    };

    fetchRentalCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Admin Panel</h2>
      <AdminTable bookings={bookings} />
    </div>
  );
};

export default Admin;
