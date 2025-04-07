package com.flavio.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.models.Task;
import com.flavio.api.services.TaskService;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Task>> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.isPresent() ? ResponseEntity.ok(task) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(task);
    }

    @GetMapping("project/{id}")
    public ResponseEntity<List<Task>> getAllTasksByProject(@PathVariable Long id) {
        List<Task> tasks = taskService.getTasksByProject(id);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("project/{id}/{id_task}")
    public ResponseEntity<Optional<Task>> getTaskByIdByProject(@PathVariable Long id, @PathVariable Long idtask) {
        Optional<Task> task = taskService.getTaskByIdProjectId(idtask, id);
        return task.isPresent() ? ResponseEntity.ok(task) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(task);
    }

    @PostMapping("/")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task savedTask = taskService.saveTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    @PutMapping("/{id}")
    public void updateTask(@PathVariable Long id, @RequestBody Task task) {
        if (taskService.getTaskById(id).isPresent())
            taskService.updateTask(task);
    }

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
