import { RentalCar } from "../types/common";

// Function to find a car by ID with integer check
export function findCarById(
  cars: RentalCar[],
  selectedCarId: number,
): RentalCar | undefined {
  const id = Math.trunc(selectedCarId); // Ensure selectedCarId is an integer
  return cars.find((car) => car.id === id);
}
