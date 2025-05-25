package com.appgile.vehicle.service;

import com.appgile.vehicle.model.Make;
import com.appgile.vehicle.model.Model;
import com.appgile.vehicle.model.Vehicle;
import com.appgile.vehicle.repository.MakeRepository;
import com.appgile.vehicle.repository.ModelRepository;
import com.appgile.vehicle.repository.VehicleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.OffsetDateTime;
import java.util.UUID;

@Slf4j
@Service
public class VehicleService {
    
    private final VehicleRepository vehicleRepository;
    private final MakeRepository makeRepository;
    private final ModelRepository modelRepository;
    private final StorageService storageService;
    
    public VehicleService(VehicleRepository vehicleRepository,
                          MakeRepository makeRepository,
                          ModelRepository modelRepository,
                          StorageService storageService) {
        this.vehicleRepository = vehicleRepository;
        this.makeRepository = makeRepository;
        this.modelRepository = modelRepository;
        this.storageService = storageService;
    }

    public Vehicle create(Vehicle vehicle, String createdBy) {
        checkAndSaveMakeAndModel(vehicle);

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

        checkAndSaveMakeAndModel(vehicle);

        vehicle.setVehicleId(id);
        vehicle.setCreatedAt(existing.getCreatedAt());
        vehicle.setCreatedBy(existing.getCreatedBy());
        vehicle.setUpdatedAt(OffsetDateTime.now());
        vehicle.setIsActive(existing.getIsActive());

        return vehicleRepository.save(vehicle);
    }

    private void checkAndSaveMakeAndModel(Vehicle vehicle) {
        Make make = vehicle.getMake();
        if (!makeRepository.existsById(make.getMakeId())) {
            makeRepository.save(make);
        }

        Model model = vehicle.getModel();
        if (!modelRepository.existsById(model.getModelId())) {
            model.setMake(make);
            modelRepository.save(model);
        }
    }

    public void delete(UUID id, String deletedBy) {
        Vehicle vehicle = getById(id);
        vehicle.setIsActive(false);
        vehicle.setUpdatedBy(deletedBy);
        vehicle.setUpdatedAt(OffsetDateTime.now());
        vehicleRepository.save(vehicle);
    }

    public String saveVehiclePhoto(UUID vehicleId, MultipartFile file) {
        String photoUrl = storageService.publishPhoto(file);
        log.debug("Photo published to url: {}", photoUrl);
        
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));

        vehicle.setPhotoUrl(photoUrl);
        vehicle.setUpdatedAt(OffsetDateTime.now());
        vehicleRepository.save(vehicle);

        return photoUrl;
    }


    public byte[] getVehiclePhoto(UUID vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));
        String fileName = vehicle.getPhotoUrl();
        return storageService.getFile(fileName);
    }
}