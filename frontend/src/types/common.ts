export interface RentalCar {
  id: string;
  vehicle: string;
  driversName: string;
  driversAge: number;
  price: number;
  rented: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface RentalCarFormData {
  vehicle: string;
  driversName: string;
  driversAge: number | null;
  price: number | null;
  fromDate: string;
  toDate: string;
}
