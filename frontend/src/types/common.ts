export interface RentalCar {
  id: number;
  name: string;
  driversName: string;
  driversAge: number;
  price: number;
  rented: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface RentalCarFormData {
  vehicle: number | null;
  driversName: string;
  driversAge: number | null;
  price: number | null;
  fromDate: string;
  toDate: string;
}
