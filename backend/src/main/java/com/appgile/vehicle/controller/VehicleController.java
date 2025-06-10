package com.appgile.vehicle.controller;

import com.appgile.vehicle.model.Vehicle;
import com.appgile.vehicle.service.VehicleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;
import java.util.List;
import com.appgile.vehicle.model.Photo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/api/v1/vehicles")
public class VehicleController {

    private final VehicleService service;

    public VehicleController(VehicleService service) {
        this.service = service;
    }

    @PostMapping
    public Vehicle create(@RequestBody Vehicle vehicle) {
        String createdBy = getCurrentUser();
        Vehicle result = service.create(vehicle, createdBy);
        log.info("Creating vehicle: {}", vehicle);
        return result;
    }

    @GetMapping
    public Page<Vehicle> list( 
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String useOfVehicle,
            @RequestParam(required = false) String type
    ) {
        Page<Vehicle> result = service.list(useOfVehicle, type, PageRequest.of(page, size));
        log.info("Listing vehicles - page: {}, size: {}, useOfVehicle: {}, type: {}", page, size, useOfVehicle, type);
        return result;
    }

    @GetMapping("/{id}")
    public Vehicle get(@PathVariable UUID id) {
        Vehicle result = service.getById(id);
        log.info("Getting vehicle with ID: {}", id);
        return result;
    }

    @PutMapping("/{id}")
    public Vehicle update(@PathVariable UUID id, @RequestBody Vehicle vehicle) {
        Vehicle result = service.update(id, vehicle);
        log.info("Updating vehicle with ID: {} with data: {}", id, vehicle);
        return result;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id, @RequestParam String deletedBy) {
        log.info("Deleting vehicle with ID: {} by user: {}", id, deletedBy);
        service.delete(id, deletedBy);
    }

    @PostMapping("/{vehicleId}/photo")
    public ResponseEntity<String> uploadVehiclePhoto(
            @PathVariable UUID vehicleId,
            @RequestParam("file") MultipartFile file) {
        log.info("Uploading vehicle photo for vehicle with ID: {}", vehicleId);
        try {
            String photoUrl = service.saveVehiclePhoto(vehicleId, file);
            return ResponseEntity.ok(photoUrl);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{vehicleId}/photos")
    public ResponseEntity<List<Photo>> getVehiclePhotos(@PathVariable UUID vehicleId) {
        log.info("Fetching all vehicle photos for vehicle with ID: {}", vehicleId);
        List<Photo> photos = service.getVehiclePhotos(vehicleId);
        return ResponseEntity.ok(photos);
    }

    private String getCurrentUser() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}