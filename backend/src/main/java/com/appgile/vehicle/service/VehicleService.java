package com.appgile.vehicle.service;

import com.appgile.vehicle.model.Vehicle;
import com.appgile.vehicle.repository.VehicleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class VehicleService {
    
    private final VehicleRepository repo;

    public VehicleService(VehicleRepository repo) {
        this.repo = repo;
    }

    public Vehicle create(Vehicle vehicle) {
        return repo.save(vehicle);
    }

    public Vehicle getById(UUID id) {
        return repo.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Page<Vehicle> list(Pageable pageable) {
        return repo.findAll(pageable);
    }

    public Vehicle update(UUID id, Vehicle vehicle) {
        Vehicle existing = getById(id);
        vehicle.setVehicleId(id);
        vehicle.setCreatedAt(existing.getCreatedAt());
        vehicle.setCreatedBy(existing.getCreatedBy());
        vehicle.setUpdatedAt(OffsetDateTime.now());
        return repo.save(vehicle);
    }

    public void delete(UUID id, String deletedBy) {
        Vehicle vehicle = getById(id);
        vehicle.setIsActive(false);
        vehicle.setUpdatedBy(deletedBy);
        vehicle.setUpdatedAt(OffsetDateTime.now());
        repo.save(vehicle);
    }
}