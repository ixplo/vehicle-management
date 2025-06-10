package com.appgile.vehicle.model;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;
import java.util.List;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OrderBy;

@Entity
@Table(name = "vehicle")
@Data
@NoArgsConstructor
public class Vehicle {
    @Id
    @Column(name = "vehicle_id")
    private UUID vehicleId = UUID.randomUUID();

    @Column(length = 50)
    private String type;

    private String derivative;

    @Column(name = "registration_date")
    private LocalDate registrationDate;

    private Integer kilometers;

    @Column(length = 4000)
    private String description;

    @Column(length = 1)
    private String ecoLabel;

    @Column(name = "number_of_doors")
    private Integer numberOfDoors;

    @Column(length = 30, name = "transmission_type")
    private String transmissionType;

    @Column(length = 30, name = "fuel_icon")
    private String fuelIcon;

    @Column(name = "visit_counter")
    private Integer visitCounter;

    @Column(length = 500, name = "dealer_link")
    private String dealerLink;

    @Column(name = "`year`")
    private Integer year;

    @Column(precision = 12, scale = 2, nullable = false)
    private BigDecimal price;

    private String supplierWebsiteUrl;
    private String supplierInternalCode;

    @Column(name = "created_by", length = 100, nullable = false)
    private String createdBy;

    @Column(name = "created_at")
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(name = "updated_by", length = 100)
    private String updatedBy;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("ordering ASC")
    private List<Photo> photos;
}