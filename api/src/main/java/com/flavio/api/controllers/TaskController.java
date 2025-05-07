package com.flavio.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.models.Task;
import com.flavio.api.services.TaskService;
import java.util.List;
import java.util.Optional;

@Tag(name = "Tareas", description = "Operaciones relacionadas con las tareas de los proyectos")
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Operation(summary = "Endpoint para obtener todas las tareas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve las tareas"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @Operation(summary = "Endpoint para obtener una tarea dado su id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve la tarea con un id determinado"),
            @ApiResponse(responseCode = "404", description = "Tarea con un id especifico no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Task>> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.isPresent() ? ResponseEntity.ok(task) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(task);
    }

    @Operation(summary = "Endpoint para obtener todas las tareas de un proyecto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve las tareas pertenecientes a un proyecto con un id determinado"),
            @ApiResponse(responseCode = "404", description = "Tareas pertenecientes a un proyecto con un id especifico no encontrado"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("project/{id}")
    public ResponseEntity<List<Task>> getAllTasksByProject(@PathVariable Long id) {
        List<Task> tasks = taskService.getTasksByProject(id);
        return ResponseEntity.ok(tasks);
    }

    @Operation(summary = "Endpoint para obtener una tarea especifica dentro de un proyecto")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve la tarea especifica dentro de un proyecto"),
            @ApiResponse(responseCode = "404", description = "Tarea especifica dentro de un proyecto no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("project/{id}/{id_task}")
    public ResponseEntity<Optional<Task>> getTaskByIdByProject(@PathVariable Long id, @PathVariable Long idtask) {
        Optional<Task> task = taskService.getTaskByIdProjectId(idtask, id);
        return task.isPresent() ? ResponseEntity.ok(task) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(task);
    }

    @Operation(summary = "Endpoint para crear una tarea")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Crea la tarea"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping("/")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task savedTask = taskService.saveTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    @Operation(summary = "Endpoint para actualizar una tarea dado su id")
    @PutMapping("/{id}")
    public void updateTask(@PathVariable Long id, @RequestBody Task task) {
        if (taskService.getTaskById(id).isPresent())
            taskService.updateTask(task);
    }

    @Operation(summary = "Endpoint para actualizar el estado de una tarea dado su id")
    @PutMapping("/status/{id}")
    public void updateStatusTask(@PathVariable Long id, @RequestBody Task task) {
        var taskToUpdateOpt = taskService.getTaskById(id);
        if (taskToUpdateOpt.isPresent()){
            Task taskToUpdate = taskToUpdateOpt.get();
            taskToUpdate.setStatus(task.getStatus());
            taskService.updateTask(task);
        }
    }

    @Operation(summary = "Endpoint para eliminar una tarea dado su id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Elimina la tarea"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        if (taskService.getTaskById(id).isPresent()) {
            taskService.deleteTask(id);
            return ResponseEntity.ok("Tarea eliminada correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarea no encontrada.");
        }
    }
}
