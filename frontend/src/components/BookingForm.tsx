import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

const BookingForm = (props: {}) => {
  const [dateRange, setDateRange] = useState<Array<Date | any>>([]);
  const [startDate, endDate] = dateRange;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Form</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="vahicle"
          >
            Vehicle
          </label>
          <select
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="vehicle"
          >
            <option value="Volvo S60">Volvo S60</option>
            <option value="BMW X5">BMW X5</option>
            <option value="Mercedes-Benz C-Class">Mercedes-Benz C-Class</option>
          </select>
          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="dateRange"
          >
            Date Range
          </label>
          <Controller
            control={control}
            name="dateRange"
            render={({ field }) => (
              <>
                <DatePicker
                  selectsRange={true}
                  id="dateRange"
                  minDate={new Date()}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(e) => {
                    setDateRange(e);
                    field.onChange(e);
                  }}
                  className="bg-gray-100 w-full text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  isClearable
                />
              </>
            )}
          />

          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            placeholder="Full Name"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="fullName"
            type="text"
          />
          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="age"
          >
            Age
          </label>
          <input
            placeholder="Age"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="age"
            type="number"
          />
          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="price"
          >
            Price
          </label>
          <input
            placeholder="0 SEK"
            className="bg-white text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="price"
            disabled
            type="number"
          />
          <button
            className="bg-teal-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-gray-100 hover:text-teal-600"
            type="submit"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
