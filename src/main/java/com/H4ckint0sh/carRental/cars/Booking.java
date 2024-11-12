package com.H4ckint0sh.carRental.cars;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Optional;

@Setter
@Getter
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private int bookingPrice;
    private Long carId;
    private String bookedBy;
    private LocalDate bookedFrom;
    private LocalDate bookedTo;

    public Booking() {
    }

    public Booking(int price, Long carId, String rentedBy, LocalDate rentedFrom, LocalDate rentedTo) {
        this.bookingPrice = price;
        this.carId = carId;
        this.bookedBy = rentedBy;
        this.bookedFrom = rentedFrom;
        this.bookedTo = rentedTo;
    }

    public static Optional<Booking> map(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'map'");
    }

    public LocalDate getStartDate() {
        return bookedFrom;
    }

    public LocalDate getEndDate() {
        return bookedTo;
    }

    public Long getCarId() {
        return carId;
    }
}
