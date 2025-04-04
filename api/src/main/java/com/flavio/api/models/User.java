package com.flavio.api.models;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    private String username;
    private String name;
    private String surnames;
    private double salary;
    private String email;
    private Role role;
    @ManyToMany(mappedBy = "users")
    private List<Task> tasks;

    public User() {}

    public User(String username, String name, String surnames, double salary, String email, Role role) {
        this.username = username;
        this.name = name;
        this.surnames = surnames;
        this.salary = salary;
        this.email = email;
        this.role = role;
    }

    public Long getId() {
        return user_id;
    }

    public void setId(Long id) {
        this.user_id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurnames() {
        return surnames;
    }

    public void setSurnames(String surnames) {
        this.surnames = surnames;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}

enum Role {
    FRONTEND, BACKEND, FULLSTACK, IT_SUPPORT
}
