package com.H4ckint0sh.carRental.cars;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Optional;

@Setter
@Getter
@Entity
@Table(name="car")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;
    private String carName;
    private int pricePerDay;

    public Car() {}

    public Car(String name, int price) {
        this.carName = name;
        this.pricePerDay = price;
    }

    public static Optional<Car> map(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'map'");
    }
}
