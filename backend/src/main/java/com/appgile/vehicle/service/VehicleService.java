package com.appgile.vehicle.service;

import com.appgile.vehicle.model.Photo;
import com.appgile.vehicle.model.Vehicle;
import com.appgile.vehicle.repository.VehicleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class VehicleService {
    
    private final VehicleRepository vehicleRepository;
    private final StorageService storageService;
    
    public VehicleService(VehicleRepository vehicleRepository,
                          StorageService storageService) {
        this.vehicleRepository = vehicleRepository;
        this.storageService = storageService;
    }

    public Vehicle create(Vehicle vehicle, String createdBy) {
        vehicle.setCreatedAt(OffsetDateTime.now());
        vehicle.setCreatedBy(createdBy);
        vehicle.setIsActive(true);

        if (vehicle.getPhotos() != null) {
            for (Photo photo : vehicle.getPhotos()) {
                photo.setVehicle(vehicle);
            }
        }

        return vehicleRepository.save(vehicle);
    }

    public Vehicle getById(UUID id) {
        return vehicleRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Vehicle> list(String useOfVehicle, String type) {
        return vehicleRepository.findByUseOfVehicleAndType(useOfVehicle, type);
    }

    public Vehicle update(UUID id, Vehicle vehicle) {
        Vehicle existing = getById(id);

        vehicle.setVehicleId(id);
        vehicle.setCreatedAt(existing.getCreatedAt());
        vehicle.setCreatedBy(existing.getCreatedBy());
        vehicle.setUpdatedAt(OffsetDateTime.now());
        vehicle.setIsActive(existing.getIsActive());

        return vehicleRepository.save(vehicle);
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

        if (vehicle.getPhotos() == null) {
            vehicle.setPhotos(new ArrayList<>());
        }
        Photo photo = new Photo();
        photo.setPhotoUrl(photoUrl);
        photo.setVehicle(vehicle);
        vehicle.getPhotos().add(photo);
        vehicle.setUpdatedAt(OffsetDateTime.now());
        vehicleRepository.save(vehicle);

        return photoUrl;
    }


    public List<Photo> getVehiclePhotos(UUID vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));
        List<Photo> photos = vehicle.getPhotos();
        return photos != null ? photos : new ArrayList<>();
    }
}