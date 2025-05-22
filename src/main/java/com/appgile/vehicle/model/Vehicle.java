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
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "vehicle")
@Data
@NoArgsConstructor
public class Vehicle {
    @Id
    @Column(name = "vehicle_id")
    private UUID vehicleId = UUID.randomUUID();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "make_id", nullable = false)
    private Make make;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id", nullable = false)
    private Model model;

    private String derivative;
    @Column(name = "`year`")
    private Integer year;
    private BigDecimal price;
    private String photoUrl;
    private String supplierWebsiteUrl;
    private String supplierInternalCode;
    private String createdBy;
    private OffsetDateTime createdAt = OffsetDateTime.now();
    private String updatedBy;
    private OffsetDateTime updatedAt;
    private Boolean isActive = true;
}