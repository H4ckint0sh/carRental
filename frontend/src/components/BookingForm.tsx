import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { ErrorMessage } from "./ErrrorMessage";
import { RentalCarFormData } from "../types/common";

const BookingForm = (props: {}) => {
  const [dateRange, setDateRange] = useState<Array<Date | any>>([]);
  const [startDate, endDate] = dateRange;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<RentalCarFormData>({
    mode: "onSubmit",
    defaultValues: {
      vehicle: "",
      driversName: "",
      dateRange: [],
      driversAge: undefined,
      price: undefined,
    },
  });

  useEffect(() => {
    // Calculate price if both startDate and endDate are selected
    if (startDate && endDate) {
      const diffInTime = endDate.getTime() - startDate.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
      const calculatedPrice = diffInDays * 300;

      // Update the price field in the form
      setValue("price", calculatedPrice);
    } else {
      // Reset price if date range is incomplete
      setValue("price", 0);
    }
  }, [startDate, endDate, setValue]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Booking Form</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="vehicle"
          >
            Vehicle
          </label>
          <select
            className={`bg-gray-100 text-gray-900 border rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 ${
              errors.vehicle ? "border-red-500" : "border-gray-200"
            }`}
            id="vehicle"
            {...register("vehicle", { required: "Please select a vehicle." })}
          >
            <option value="">Select Vehicle</option>
            <option value="Volvo S60">Volvo S60</option>
            <option value="BMW X5">BMW X5</option>
            <option value="Mercedes-Benz C-Class">Mercedes-Benz C-Class</option>
          </select>
          {errors?.vehicle?.message && (
            <ErrorMessage message={errors.vehicle.message} severity="error" />
          )}

          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="dateRange"
          >
            Date Range
          </label>
          <Controller
            control={control}
            name="dateRange"
            rules={{ required: "Please select a date range." }}
            render={({ field }) => (
              <DatePicker
                selectsRange
                placeholderText="Select date range (start date and end date)"
                id="dateRange"
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
                onChange={(e) => {
                  setDateRange(e);
                  field.onChange(e);
                }}
                className={`bg-gray-100 w-full text-gray-900 border rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 ${
                  errors.dateRange ? "border-red-500" : "border-gray-200"
                }`}
                isClearable
              />
            )}
          />
          {errors?.dateRange?.message && (
            <ErrorMessage message={errors.dateRange.message} severity="error" />
          )}
          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="driversName"
          >
            Driver's Name
          </label>
          <input
            placeholder="Driver's Name"
            className={`bg-gray-100 text-gray-900 border rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.driversName ? "border-red-500" : "border-gray-200"
            }`}
            id="driversName"
            {...register("driversName", {
              required: "Please enter a driver's name.",
              minLength: {
                value: 5,
                message: "Must be at least 5 characters.",
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
            htmlFor="driversAge"
          >
            Driver's Age
          </label>
          <input
            placeholder="Driver's Age"
            className={`bg-gray-100 text-gray-900 border rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.driversName ? "border-red-500" : "border-gray-200"
            }`}
            id="driversAge"
            {...register("driversAge", {
              required: "Please enter a driver's age.",
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
            className="bg-white text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="price"
            disabled
            {...register("price")}
            type="number"
          />

          <button
            className="bg-teal-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-gray-100 hover:text-teal-600 disabled:bg-gray-200 disabled:text-gray-500"
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
