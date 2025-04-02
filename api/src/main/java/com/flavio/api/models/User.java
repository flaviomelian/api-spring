package com.flavio.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surnames;
    private double salary;
    private String email;

    public User() {}

    public User(String name, String surnames, double salary, String email) {
        this.name = name;
        this.surnames = surnames;
        this.salary = salary;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurnames() {
        return surnames;
    }

    public double getSalary() {
        return salary;
    }

    public String getEmail() {
        return email;
    }
}

