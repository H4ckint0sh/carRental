package com.H4ckint0sh.carRental.service;

import com.H4ckint0sh.carRental.repository.CarRepository;
import com.H4ckint0sh.carRental.cars.Car;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CarService {

   private final CarRepository carRepo;

    @Autowired
    public CarService(CarRepository carRepo) {
        this.carRepo = carRepo;
    }

    public List<Car> getAllCars() {
        return carRepo.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepo.findById(id);
    }

    public Car createCar(Car car) {
        return carRepo.save(car);
    }

    public void deleteCar(Long id) {
        if (carRepo.existsById(id)) {
            carRepo.deleteById(id);
        } else {
            throw new RuntimeException("Car not found with id " + id);
        }
    }

    public Car updateCarPartial(Long id, Map<String, Object> updates) {
        Car car = carRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found with id " + id));

        // Use BeanWrapper to apply partial updates
        BeanWrapper beanWrapper = new BeanWrapperImpl(car);
        updates.forEach((key, value) -> {
            if (beanWrapper.isWritableProperty(key)) {
                beanWrapper.setPropertyValue(key, value);
            }
        });

        // Save the updated car back to the repository
        return carRepo.save(car);
    }
}
