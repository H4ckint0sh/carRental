import { useEffect, useState } from "react";

interface UsePriceCalculationProps {
  startDate: string;
  endDate: string;
  pricePerDay: number;
}

const usePriceCalculation = ({
  startDate,
  endDate,
  pricePerDay,
}: UsePriceCalculationProps) => {
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diffInTime = end.getTime() - start.getTime();
        const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
        const newPrice = diffInDays * pricePerDay;
        setCalculatedPrice(newPrice);
      }
    }
  }, [startDate, endDate, pricePerDay]);

  return calculatedPrice;
};

export default usePriceCalculation;
