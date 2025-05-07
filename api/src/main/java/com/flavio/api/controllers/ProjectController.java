package com.flavio.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.models.Project;
import com.flavio.api.services.ProjectService;
import java.util.List;
import java.util.Optional;

@Tag(name = "Proyectos", description = "Operaciones relacionadas con los proyectos")

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Operation(summary = "Endpoint para obtener todos los proyectos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve los proyectos"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @Operation(summary = "Endpoint para obtener un proyecto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve el proyecto con un id determinado"),
            @ApiResponse(responseCode = "404", description = "Proyecto con un id especifico no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Project>> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.isPresent() ? ResponseEntity.ok(project) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(project);
    }

    @Operation(summary = "Endpoint para crear un proyecto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Crea el proyecto"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping("/")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project savedProject = projectService.saveProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
    }

    @Operation(summary = "Endpoint para actualizar un proyecto dado su id")
    @PutMapping("/{id}")
    public void updateProject(@PathVariable Long id, @RequestBody Project project) {
        if (projectService.getProjectById(id).isPresent())
            projectService.updateProject(project);
    }

    @Operation(summary = "Endpoint para eliminar un proyecto dado su id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Elimina el proyecto"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        if (projectService.getProjectById(id).isPresent()) {
            projectService.deleteProject(id);
            return ResponseEntity.ok("Tarea eliminada correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarea no encontrada.");
        }
    }
}
