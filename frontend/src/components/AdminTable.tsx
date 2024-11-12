import { Booking } from "../types/common";
import rentalCars from "../data/rentalCars.json";

interface AdminTableProps {
  bookings: Booking[];
}
const AdminTable: React.FC<AdminTableProps> = ({ bookings }) => {
  return (
    <div className="rounded-lg border border-gray-200">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200  text-sm">
          <thead className="text-left bg-teal-700 text-white">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 font-medium ">
                Booking ID
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium ">
                Drivers Name
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium ">Car</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium ">
                Booked From
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">
                Booked To
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium ">
                Booking Price
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-left">
            {bookings.map((booking) => (
              <tr key={booking.bookingId}>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                  {booking?.bookingId}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-medium  text-gray-900">
                  {booking?.bookedBy}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                  {
                    rentalCars?.find((car) => car.carId === booking.carId)
                      ?.carName
                  }
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {booking?.bookedFrom}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {booking?.bookedTo}
                </td>
                <td className="whitespace-nowrap px-4 italic py-3 text-gray-700">
                  {booking.bookingPrice}{" "}
                  <span className="ml-2 font-medium">SEK</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
