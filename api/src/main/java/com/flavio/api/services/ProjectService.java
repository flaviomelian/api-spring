package com.flavio.api.services;

import com.flavio.api.models.Project;
import com.flavio.api.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository repository;

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return repository.findById(id);
    }

    public Project saveProject(Project Project) {
        return repository.save(Project);
    }

    public void deleteProject(Long id) {
        repository.deleteById(id);
    }

    public void updateProject(Project Project) {
        repository.save(Project);
    }
}
