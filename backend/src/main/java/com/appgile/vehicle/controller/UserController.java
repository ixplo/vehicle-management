package com.appgile.vehicle.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.appgile.vehicle.model.User;
import com.appgile.vehicle.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Tag(name = "User Management", description = "User API")
@PreAuthorize("hasRole('Admin')")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @Operation(summary = "Create a new user")
    @PostMapping
    public User createUser(
            @Parameter(description = "User object to create", required = true)
            @RequestBody User user) {
        return userService.create(user);
    }

    @Operation(summary = "Delete a user by ID")
    @DeleteMapping("/{id}")
    public void deleteUser(
            @Parameter(description = "User ID", required = true)
            @PathVariable UUID id) {
        userService.delete(id);
    }

    @Operation(summary = "Update a user by ID")
    @PutMapping("/{id}")
    public User updateUser(
            @Parameter(description = "User ID", required = true)
            @PathVariable UUID id,
            @Parameter(description = "Updated user object", required = true)
            @RequestBody User updatedUser) {
        return userService.update(id, updatedUser);
    }
}