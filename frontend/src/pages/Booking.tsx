import BookingForm from "../components/BookingForm";
import rentalCars from "../data/rentalCars.json";

const BookingPage = () => {
  return (
    <div>
      <BookingForm rentalCars={rentalCars} />
    </div>
  );
};

export default BookingPage;
