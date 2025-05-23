package com.appgile.vehicle.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "make")
@Data
@NoArgsConstructor
public class Make {
    @Id
    @Column(name = "make_id")
    private UUID makeId = UUID.randomUUID();

    @Column(nullable = false, length = 100)
    private String name;
}