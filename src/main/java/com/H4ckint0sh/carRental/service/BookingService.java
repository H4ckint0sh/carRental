package com.H4ckint0sh.carRental.service;

import com.H4ckint0sh.carRental.repository.BookingRepository;
import com.H4ckint0sh.carRental.cars.Booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

   private final BookingRepository bookingRepo;

    @Autowired
    public BookingService(BookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepo.findById(id);
    }

    public Booking createBooking(Booking booking) {
        return bookingRepo.save(booking);
    }

    public boolean isCarAvailableForBooking(Long bookingId, LocalDate startDate, LocalDate endDate) {
        List<Booking> conflictingBookings = bookingRepo.findByCarIdAndDatesOverlap(bookingId, startDate, endDate);
        return conflictingBookings.isEmpty();
    }
}
