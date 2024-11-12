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
    private int id;
    private String name;
    private int price;
    private boolean rented;
    private String rentedBy;
    private String rentedFrom;
    private String rentedTo;

    public Car() {}

    public Car(String name, int price, boolean rented, String rentedBy, String rentedFrom, String rentedTo) {
        this.name = name;
        this.price = price;
        this.rented = rented;
        this.rentedBy = rentedBy;
        this.rentedFrom = rentedFrom;
        this.rentedTo = rentedTo;
    }

    public static Optional<Car> map(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'map'");
    }
}
