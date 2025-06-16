package com.appgile.vehicle.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "vehicle_photo")
@Data
@NoArgsConstructor
public class Photo {
    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "photo_id")
    private UUID photoId;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    @JsonBackReference
    private Vehicle vehicle;

    @Column(name = "photo_url", nullable = false)
    private String photoUrl;

    @Column
    private Integer ordering;

    @Column
    private String description;

}
