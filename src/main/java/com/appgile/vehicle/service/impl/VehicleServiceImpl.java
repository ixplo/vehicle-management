package com.appgile.vehicle.service.impl;

import com.appgile.vehicle.model.Vehicle;
import com.appgile.vehicle.repository.VehicleRepository;
import com.appgile.vehicle.service.VehicleService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class VehicleServiceImpl implements VehicleService {
    
    private final VehicleRepository repo;

    public VehicleServiceImpl(VehicleRepository repo) {
        this.repo = repo;
    }

    @Override
    public Vehicle create(Vehicle vehicle) {
        return repo.save(vehicle);
    }

    @Override
    public Vehicle getById(UUID id) {
        return repo.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Page<Vehicle> list(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Override
    public Vehicle update(UUID id, Vehicle vehicle) {
        Vehicle existing = getById(id);
        vehicle.setVehicleId(id);
        vehicle.setCreatedAt(existing.getCreatedAt());
        vehicle.setCreatedBy(existing.getCreatedBy());
        vehicle.setUpdatedAt(OffsetDateTime.now());
        return repo.save(vehicle);
    }

    @Override
    public void delete(UUID id, String deletedBy) {
        Vehicle v = getById(id);
        v.setIsActive(false);
        v.setUpdatedBy(deletedBy);
        v.setUpdatedAt(OffsetDateTime.now());
        repo.save(v);
    }
}