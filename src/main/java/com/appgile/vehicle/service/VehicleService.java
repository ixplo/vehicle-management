// service/VehicleService.java
package com.appgile.vehicle.service;

import com.appgile.vehicle.model.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface VehicleService {
    Vehicle create(Vehicle vehicle);

    Vehicle getById(UUID id);

    Page<Vehicle> list(Pageable pageable);

    Vehicle update(UUID id, Vehicle vehicle);

    void delete(UUID id, String deletedBy);
}