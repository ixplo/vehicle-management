package com.appgile.vehicle.repository;

import com.appgile.vehicle.model.Model;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ModelRepository extends JpaRepository<Model, UUID> {}