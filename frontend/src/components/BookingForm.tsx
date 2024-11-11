import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "./ErrrorMessage";
import { RentalCarFormData } from "../types/common";
import Toast from "./ToastMessage";

const BookingForm = () => {
  const [toast, setToast] = useState<{
    severity: string;
    message: string;
  } | null>(null);
  const showToast = (severity: string, message: string) => {
    setToast({ severity, message });
  };
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
    reValidateMode: "onSubmit",
    defaultValues: {
      vehicle: "",
      driversName: "",
      toDate: "",
      fromDate: "",
      driversAge: null,
      price: null,
    },
  });

  useEffect(() => {
    // Watch for changes in date fields
    const startDate = watch("fromDate");
    const endDate = watch("toDate");

    if (startDate && endDate) {
      // Convert the string dates to Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Check if start and end are valid dates
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diffInTime = end.getTime() - start.getTime();
        const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
        const calculatedPrice = diffInDays * 300;

        // Update the price field in the form
        setValue("price", calculatedPrice);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("fromDate"), watch("toDate")]);

  const onSubmit = (data: RentalCarFormData) => {
    console.log(data);

    // Reset form after submit
    reset({
      vehicle: "",
      driversName: "",
      toDate: "",
      fromDate: "",
      driversAge: null,
      price: null,
    });
    clearErrors(); // Clear errors after submit
    showToast("success", "Booking Successful");
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="flex flex-col items-center justify-center my-10">
      {toast && (
        <Toast
          severity={toast.severity as "success" | "error" | "warning" | "info"}
          message={toast.message}
        />
      )}
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
            htmlFor="fromDate"
          >
            From Date
          </label>
          <input
            placeholder="The date you want to rent from"
            className={`bg-gray-100 text-gray-900 border rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.driversName ? "border-red-500" : "border-gray-200"
            }`}
            id="driversAge"
            {...register("fromDate", {
              required: "Please enter a from date.",
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
            className={`bg-gray-100 text-gray-900 border rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.driversName ? "border-red-500" : "border-gray-200"
            }`}
            id="toDate"
            {...register("toDate", {
              required: "Please enter a from date.",
              min: { value: 18, message: "Must be at least 18 years old." },
            })}
            type="date"
            min={
              getValues("fromDate")
                ? (getValues("fromDate") as string)
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
