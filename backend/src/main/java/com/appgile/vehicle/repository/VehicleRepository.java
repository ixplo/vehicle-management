package com.appgile.vehicle.repository;

import com.appgile.vehicle.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VehicleRepository extends JpaRepository<Vehicle, UUID> {
    List<Vehicle> findByUseOfVehicleAndType(String useOfVehicle, String type);
}