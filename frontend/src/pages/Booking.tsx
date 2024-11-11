import axios from "axios";
import BookingForm from "../components/BookingForm";

const BookingPage = (props: {}) => {
  // const [rentalCars, setRentalCars] = useState<RentalCar[]>([]);
  const getHelloWorld = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cars");
      console.log(response);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  getHelloWorld();

  return (
    <div>
      <BookingForm />
    </div>
  );
};

export default BookingPage;
