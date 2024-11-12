import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "./ErrrorMessage";
import { RentalCar, RentalCarFormData } from "../types/common";
import { useToastContext } from "../context/ToastContext";
import axios from "axios";

interface BookingFormProps {
  rentalCars: RentalCar[];
}

const BookingForm: React.FC<BookingFormProps> = ({ rentalCars }) => {
  const { showToast } = useToastContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<RentalCarFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      vehicle: 0,
      driversName: "",
      toDate: "",
      fromDate: "",
      driversAge: null,
      price: null,
    },
  });

  useEffect(() => {
    if (watch("fromDate") && watch("toDate")) {
      const start = new Date(watch("fromDate"));
      const end = new Date(watch("toDate"));
      const selectedCarId = watch("vehicle");

      // eslint-disable-next-line eqeqeq
      const selectedCar = rentalCars.find((car) => car.carId == selectedCarId); // Fix comparison

      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && selectedCar) {
        const diffInTime = end.getTime() - start.getTime();
        const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
        const newPrice = diffInDays * selectedCar.pricePerDay;
        setValue("price", newPrice);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("fromDate"), watch("toDate"), watch("vehicle")]); // Ensure recalculation on vehicle change

  const onSubmit = async (data: RentalCarFormData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/bookings", {
        carId: data.vehicle,
        bookedBy: data.driversName,
        bookingPrice: data.price,
        bookedFrom: new Date(data.fromDate),
        bookedTo: new Date(data.toDate),
      });
      if (response.status === 200) {
        showToast("success", "Successfully updated rental car");
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "Some error occured, please try again");
      }
    }

    // Reset form after submit
    reset({
      vehicle: 0,
      driversName: "",
      toDate: "",
      fromDate: "",
      driversAge: null,
      price: 0,
    });
    clearErrors(); // Clear errors after submit
  };

  useEffect(() => {}, [errors]);

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Booking Form</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="vehicle"
          >
            Vehicle
          </label>
          <select
            className={`bg-gray-100 text-gray-900 border rounded-lg p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 ${
              errors.vehicle ? "border-red-500" : "border-gray-200"
            }`}
            id="vehicle"
            {...register("vehicle", { required: "This field is required" })}
          >
            <option value="">Select Vehicle</option>
            {rentalCars.map((car) => (
              <option key={car.carId} value={car.carId}>
                {car.carName + " " + car.pricePerDay + " SEK per/day"}
              </option>
            ))}
          </select>
          {errors?.vehicle?.message && (
            <ErrorMessage message={errors.vehicle.message} severity="error" />
          )}

          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="driversName"
          >
            Driver's Name
          </label>
          <input
            placeholder="Driver's Name"
            className={`bg-gray-100 text-gray-900 border rounded-lg p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.driversName ? "border-red-500" : "border-gray-200"
            }`}
            id="driversName"
            {...register("driversName", {
              required: "This field is required",
              minLength: {
                value: 5,
                message: "Must be at least 5 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/, // Allows only letters and spaces
                message: "Only letters are allowed",
              },
            })}
            type="text"
          />
          {errors?.driversName?.message && (
            <ErrorMessage
              message={errors.driversName.message}
              severity="error"
            />
          )}

          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="fromDate"
          >
            From Date
          </label>
          <input
            placeholder="The date you want to rent from"
            className={`bg-gray-100 text-gray-900 border rounded-lg p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.fromDate ? "border-red-500" : "border-gray-200"
            }`}
            id="driversAge"
            {...register("fromDate", {
              required: "This field is required",
              min: { value: 18, message: "Must be at least 18 years old." },
            })}
            type="date"
            min={new Date().toISOString().split("T")[0]}
          />
          {errors?.fromDate?.message && (
            <ErrorMessage message={errors.fromDate.message} severity="error" />
          )}

          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="toDate"
          >
            To Date
          </label>
          <input
            placeholder="The date you want to rent from"
            className={`bg-gray-100 text-gray-900 border rounded-lg p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.toDate ? "border-red-500" : "border-gray-200"
            }`}
            id="toDate"
            {...register("toDate", {
              required: "This field is required",
              min: { value: 18, message: "Must be at least 18 years old." },
            })}
            type="date"
            min={
              getValues("fromDate")
                ? getValues("fromDate")
                : new Date().toISOString().split("T")[0]
            }
          />
          {errors?.toDate?.message && (
            <ErrorMessage message={errors.toDate.message} severity="error" />
          )}

          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="driversAge"
          >
            Driver's Age
          </label>
          <input
            placeholder="Driver's Age"
            className={`bg-gray-100 text-gray-900 border rounded-lg p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.driversName ? "border-red-500" : "border-gray-200"
            }`}
            id="driversAge"
            {...register("driversAge", {
              required: "This field is required",
              min: { value: 18, message: "Must be at least 18 years old." },
            })}
            type="number"
          />
          {errors?.driversAge?.message && (
            <ErrorMessage
              message={errors.driversAge.message}
              severity="error"
            />
          )}

          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="price"
          >
            Price
          </label>
          <input
            placeholder="0 SEK"
            className="bg-white text-gray-900 border-0 rounded-lg p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="price"
            disabled
            {...register("price")}
            type="number"
          />

          <button
            className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-gray-100 hover:text-teal-600 disabled:bg-gray-200 disabled:text-gray-500"
            type="submit"
            // disabled={!isValid}
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
