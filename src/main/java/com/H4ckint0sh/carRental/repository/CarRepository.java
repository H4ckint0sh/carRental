package com.H4ckint0sh.carRental.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.H4ckint0sh.carRental.cars.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
}
