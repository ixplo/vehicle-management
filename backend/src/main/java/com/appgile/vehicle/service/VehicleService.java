package com.appgile.vehicle.service;

import com.appgile.vehicle.model.Make;
import com.appgile.vehicle.model.Model;
import com.appgile.vehicle.model.Vehicle;
import com.appgile.vehicle.repository.MakeRepository;
import com.appgile.vehicle.repository.ModelRepository;
import com.appgile.vehicle.repository.VehicleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class VehicleService {
    
    private final VehicleRepository vehicleRepository;
    private final MakeRepository makeRepository;
    private final ModelRepository modelRepository;

    public VehicleService(VehicleRepository vehicleRepository, 
                          MakeRepository makeRepository, 
                          ModelRepository modelRepository) {
        this.vehicleRepository = vehicleRepository;
        this.makeRepository = makeRepository;
        this.modelRepository = modelRepository;
    }

    public Vehicle create(Vehicle vehicle, String createdBy) {
        Make make = vehicle.getMake();
        if (!makeRepository.existsById(make.getMakeId())) {
            makeRepository.save(make);
        }
        Model model = vehicle.getModel();
        if (!modelRepository.existsById(model.getModelId())) {
            model.setMake(make);
            modelRepository.save(model);
        }

        vehicle.setCreatedAt(OffsetDateTime.now());
        vehicle.setCreatedBy(createdBy);
        vehicle.setIsActive(true);

        return vehicleRepository.save(vehicle);
    }

    public Vehicle getById(UUID id) {
        return vehicleRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Page<Vehicle> list(Pageable pageable) {
        return vehicleRepository.findAll(pageable);
    }

    public Vehicle update(UUID id, Vehicle vehicle) {
        Vehicle existing = getById(id);
        vehicle.setVehicleId(id);
        vehicle.setCreatedAt(existing.getCreatedAt());
        vehicle.setCreatedBy(existing.getCreatedBy());
        vehicle.setUpdatedAt(OffsetDateTime.now());
        return vehicleRepository.save(vehicle);
    }

    public void delete(UUID id, String deletedBy) {
        Vehicle vehicle = getById(id);
        vehicle.setIsActive(false);
        vehicle.setUpdatedBy(deletedBy);
        vehicle.setUpdatedAt(OffsetDateTime.now());
        vehicleRepository.save(vehicle);
    }
}