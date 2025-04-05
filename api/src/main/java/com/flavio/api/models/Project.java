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

    public Project() {}
    
    public Project(Long id, String name, String enterprise, Date deadline, Date initdate) {
        this.id = id;
        this.name = name;
        this.enterprise = enterprise;
        this.deadline = deadline;
        this.initdate = initdate;
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
    
}
