package com.flavio.api.models;

import java.sql.Date;
import java.util.ArrayList;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String enterprise;
    private Date deadline, initdate;
    @OneToMany
    @JoinColumn(name = "task_id", referencedColumnName = "id", nullable = false)
    private ArrayList<Task> tasks;
    @OneToMany
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private ArrayList<User> users;
    
    public Project(Long id, String name, String enterprise, Date deadline, Date initdate, ArrayList<Task> tasks,
            ArrayList<User> users) {
        this.id = id;
        this.name = name;
        this.enterprise = enterprise;
        this.deadline = deadline;
        this.initdate = initdate;
        this.tasks = tasks;
        this.users = users;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEnterprise() {
        return enterprise;
    }

    public void setEnterprise(String enterprise) {
        this.enterprise = enterprise;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public Date getInitdate() {
        return initdate;
    }

    public void setInitdate(Date initdate) {
        this.initdate = initdate;
    }

    public ArrayList<Task> getTasks() {
        return tasks;
    }

    public void setTasks(ArrayList<Task> tasks) {
        this.tasks = tasks;
    }

    public ArrayList<User> getUsers() {
        return users;
    }

    public void setUsers(ArrayList<User> users) {
        this.users = users;
    }
    
}
