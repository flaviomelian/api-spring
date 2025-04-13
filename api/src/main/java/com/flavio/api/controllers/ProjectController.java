package com.flavio.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.models.Project;
import com.flavio.api.services.ProjectService;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService ProjectService;

    public ProjectController(ProjectService ProjectService) {
        this.ProjectService = ProjectService;
    }

    @GetMapping("/")
    public List<Project> getAllProjects() {
        return ProjectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Project>> getProjectById(@PathVariable Long id) {
        Optional<Project> Project = ProjectService.getProjectById(id);
        return Project.isPresent() ? ResponseEntity.ok(Project) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(Project);
    }

    @PostMapping("/")
    public ResponseEntity<Project> createProject(@RequestBody Project Project) {
        Project savedProject = ProjectService.saveProject(Project);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
    }

    @PutMapping("/{id}")
    public void updateProject(@PathVariable Long id, @RequestBody Project Project) {
        if (ProjectService.getProjectById(id).isPresent())
            ProjectService.updateProject(Project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        if (ProjectService.getProjectById(id).isPresent()) {
            ProjectService.deleteProject(id);
            return ResponseEntity.ok("Tarea eliminada correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarea no encontrada.");
        }
    }
}
