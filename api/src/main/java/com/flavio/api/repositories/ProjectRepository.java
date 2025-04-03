package com.flavio.api.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.flavio.api.models.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>{}