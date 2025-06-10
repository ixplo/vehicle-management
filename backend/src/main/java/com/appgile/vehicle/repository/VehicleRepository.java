package com.appgile.vehicle.repository;

import com.appgile.vehicle.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface VehicleRepository extends JpaRepository<Vehicle, UUID> {
    Page<Vehicle> findByUseOfVehicleAndType(String useOfVehicle, String type, Pageable pageable);
}