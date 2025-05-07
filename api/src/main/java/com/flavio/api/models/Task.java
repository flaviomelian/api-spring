package com.flavio.api.models;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long task_id;

    private String content;

    @ManyToMany
    @JsonBackReference
    @JsonIgnore 
    @JoinTable(
        name = "task_users",
        joinColumns = @JoinColumn(name = "task_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    private int time, status = 0;
    private String priority;
    private String dataUsers;

    public Task() {}

    public Task(String content, List<User> users, int time, String priority, Project project, String dataUsers) {
        this.content = content;
        this.users = users;
        this.time = time;
        this.priority = priority;
        this.project = project;
        this.dataUsers = dataUsers;
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getdataUsers() {
        return dataUsers;
    }

    public void setdataUsers(String dataUsers) {
        this.dataUsers = dataUsers;
    }
}