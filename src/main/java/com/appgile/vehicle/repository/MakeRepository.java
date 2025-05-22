package com.appgile.vehicle.repository;

import com.appgile.vehicle.model.Make;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MakeRepository extends JpaRepository<Make, UUID> {}