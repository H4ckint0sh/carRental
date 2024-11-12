import axios from "axios";
import { useState, useEffect } from "react";
import BookingForm from "../components/BookingForm";
import { RentalCar } from "../types/common";
import { useToastContext } from "../context/ToastContext";

const BookingPage = () => {
  const [rentalCars, setRentalCars] = useState<RentalCar[]>([]);
  const { showToast } = useToastContext();

  useEffect(() => {
    const fetchRentalCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/cars");
        setRentalCars(response.data);
        showToast("success", "Successfully fetched rental cars");
      } catch (error) {
        showToast("error", "Could not fetch rentalCars");
      }
    };

    fetchRentalCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BookingForm rentalCars={rentalCars} />
    </div>
  );
};

export default BookingPage;
