package com.ac3.InventorMe.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "user")
public class RegistrationData {
    @Id
    private UUID id = UUID.randomUUID();
    private String name;
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
