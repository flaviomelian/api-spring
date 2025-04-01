package com.flavio.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public record User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id,
    String name,
    String email
) {}
