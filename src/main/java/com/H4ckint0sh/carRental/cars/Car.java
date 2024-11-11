package com.H4ckint0sh.carRental.cars;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.Optional;

@Setter
@Getter
@Entity
@Table(name="rentalcar")
public class Car {
    @Id
    private int id;
    private String name;
    private int price;
    private boolean rented;
    private String rentedBy;

    @Column(name = "rented_from")
    private LocalDate rentedFrom;

    @Column(name = "rented_to")
    private LocalDate rentedTo;

    public Car() {}

    public Car(String name, int price) {
        this.name = name;
        this.price = price;
        this.rented = false;
        this.rentedBy = null;
        this.rentedFrom = null;
        this.rentedTo = null;
    }

    public static Optional<Car> map(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'map'");
    }
}
