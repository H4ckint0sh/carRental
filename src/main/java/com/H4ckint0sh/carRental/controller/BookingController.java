package com.H4ckint0sh.carRental.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.H4ckint0sh.carRental.cars.Booking;
import com.H4ckint0sh.carRental.service.BookingService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Booking> getAllBookings()
    {
        return (List<Booking>) bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@Validated @RequestBody Booking booking) {
        boolean isCarAvailable = bookingService.isCarAvailableForBooking(booking.getCarId(), booking.getStartDate(), booking.getEndDate());

        if (!isCarAvailable) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Car is already booked within the selected dates.");
        }

        Booking createdBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(createdBooking);
    }
}

