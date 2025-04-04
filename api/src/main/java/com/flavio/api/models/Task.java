package com.flavio.api.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long task_id;

    private String content;

    @ManyToMany
    @JoinTable(
        name = "task_users",
        joinColumns = @JoinColumn(name = "task_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    private int time;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    public Task() {}

    public Task(String content, List<User> users, int time, Priority priority, Project project) {
        this.content = content;
        this.users = users;
        this.time = time;
        this.priority = priority;
        this.project = project;
    }

    public Long getId() {
        return task_id;
    }

    public void setId(Long task_id) {
        this.task_id = task_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}

enum Priority {
    HIGH, MEDIUM, LOW
}