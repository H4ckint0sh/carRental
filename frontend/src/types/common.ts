export interface RentalCarFormData {
  vehicle: number;
  driversName: string;
  driversAge: number | null;
  price: number | null;
  fromDate: string;
  toDate: string;
}

export interface RentalCar {
  carId: number;
  carName: string;
  pricePerDay: number;
}

export interface Booking {
  bookingId: number;
  bookingPrice: number;
  carId: number;
  bookedBy: string;
  bookedFrom: Date;
  bookedTo: Date;
}
