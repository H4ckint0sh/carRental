import React, { useMemo } from "react";
import { Booking } from "../types/common";
import rentalCars from "../data/rentalCars.json";

interface AdminTableProps {
  bookings: Booking[];
}

const AdminTable: React.FC<AdminTableProps> = React.memo(({ bookings }) => {
  // Memoize the findCarName function to prevent repeated calculations
  const findCarName = useMemo(
    () => (carId: number) =>
      rentalCars.find((car) => car.carId === carId)?.carName || "Unknown",
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rentalCars],
  );

  return (
    <div
      className="rounded-lg border border-gray-200"
      aria-label="Booking Management Table"
    >
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
          <thead className="text-left bg-teal-700 text-white">
            <tr>
              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 font-medium"
              >
                Booking ID
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 font-medium"
              >
                Driver's Name
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 font-medium"
              >
                Car
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 font-medium"
              >
                Booked From
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 font-medium"
              >
                Booked To
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 font-medium"
              >
                Booking Price
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-left">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                    {booking.bookingId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                    {booking.bookedBy}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                    {findCarName(booking.carId)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {booking.bookedFrom}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {booking.bookedTo}
                  </td>
                  <td className="whitespace-nowrap px-4 italic py-3 text-gray-700">
                    {booking.bookingPrice}{" "}
                    <span className="ml-2 font-medium">SEK</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-3 text-gray-700">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default AdminTable;
