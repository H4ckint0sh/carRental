import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { RentalCar, RentalCarFormData } from "../types/common";
import { useToastContext } from "../context/ToastContext";
import Input from "./FormInput";
import { ErrorMessage } from "./ErrrorMessage";
import clsx from "clsx";

interface BookingFormProps {
  rentalCars: RentalCar[];
}

const BookingForm: React.FC<BookingFormProps> = ({ rentalCars }) => {
  const { showToast } = useToastContext();
  const [isLoading, setIsLoading] = useState(false);
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
    delayError: 1000,
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
    const fromDate = watch("fromDate");
    const toDate = watch("toDate");
    const selectedCarId = watch("vehicle");
    // eslint-disable-next-line eqeqeq
    const selectedCar = rentalCars.find((car) => car.carId == selectedCarId);

    if (fromDate && toDate && selectedCar) {
      const diffInDays = Math.ceil(
        (new Date(toDate).getTime() - new Date(fromDate).getTime()) /
          (1000 * 3600 * 24),
      );
      setValue("price", diffInDays * selectedCar.pricePerDay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("fromDate"), watch("toDate"), watch("vehicle")]);

  const onSubmit = async (data: RentalCarFormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/bookings", {
        carId: data.vehicle,
        bookedBy: data.driversName,
        bookingPrice: data.price,
        bookedFrom: new Date(data.fromDate),
        bookedTo: new Date(data.toDate),
      });
      setIsLoading(false);
      if (response.status === 200) {
        showToast("success", "Successfully updated rental car");
      }
    } catch (error: any) {
      setIsLoading(false);
      showToast(
        "error",
        error.response?.status === 409
          ? error.response.data.message
          : "Some error occurred, please try again",
      );
    } finally {
      // Reset form and clear errors regardless of success or failure
      reset({
        vehicle: 0,
        driversName: "",
        toDate: "",
        fromDate: "",
        driversAge: null,
        price: null,
      });
      clearErrors();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-lg shadow-md p-6">
        <h2 className="text-xl text-center font-bold text-gray-900 mb-8">
          Booking Form
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="vehicle"
            className="text-md font-medium mb-4 text-gray-900 cursor-pointer"
          >
            Vehicle <span className="text-red-500">*</span>
          </label>
          <select
            id="vehicle"
            {...register("vehicle", {
              required: "This field is required",
              min: { value: 1, message: "This field is required" },
            })}
            className={clsx(
              `bg-gray-100 text-gray-900 border rounded-lg p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500`,
              errors.vehicle ? "border-red-500 mb-2" : "border-gray-200 mb-4",
            )}
          >
            <option value={0}>Select Vehicle</option>
            {rentalCars.map((car) => (
              <option key={car.carId} value={car.carId}>
                {car.carName} - {car.pricePerDay} SEK Per/Day
              </option>
            ))}
          </select>
          {errors.vehicle && (
            <ErrorMessage message={errors.vehicle.message!} severity="error" />
          )}

          <Input
            id="driversName"
            label="Driver's Name"
            placeholder="Driver's Name"
            error={errors.driversName}
            register={register("driversName", {
              required: "This field is required",
              minLength: { value: 3, message: "Must be at least 5 characters" },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters are allowed",
              },
            })}
          />

          <Input
            id="fromDate"
            label="From Date"
            placeholder="The date you want to rent from"
            type="date"
            error={errors.fromDate}
            register={register("fromDate", {
              required: "This field is required",
            })}
            min={new Date().toISOString().split("T")[0]}
          />

          <Input
            id="toDate"
            label="To Date"
            placeholder="The date you want to rent to"
            type="date"
            error={errors.toDate}
            register={register("toDate", {
              required: "This field is required",
            })}
            min={
              getValues("fromDate") || new Date().toISOString().split("T")[0]
            }
          />

          <Input
            id="driversAge"
            label="Driver's Age"
            placeholder="Driver's Age"
            type="number"
            error={errors.driversAge}
            register={register("driversAge", {
              required: "This field is required",
              min: { value: 18, message: "Must be at least 18 years old" },
            })}
          />

          <Input
            id="price"
            label="Price"
            placeholder="0 SEK"
            type="number"
            register={register("price")}
            disabled
            className="bg-white border-0"
          />

          <button
            type="submit"
            className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg my-4 hover:bg-gray-100 hover:text-teal-600 disabled:bg-gray-200 disabled:text-gray-500"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="mr-4">Loading</span>
                <svg
                  className="animate-spin h-6 w-6 text-teal-600"
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
            ) : (
              "Book Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
