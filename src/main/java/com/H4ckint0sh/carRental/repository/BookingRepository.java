package com.H4ckint0sh.carRental.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.H4ckint0sh.carRental.cars.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT b FROM Booking b WHERE b.carId = :carId AND (b.bookedFrom <= :endDate AND b.bookedTo >= :startDate)")
    List<Booking> findByCarIdAndDatesOverlap(Long carId, LocalDate startDate, LocalDate endDate);
}
