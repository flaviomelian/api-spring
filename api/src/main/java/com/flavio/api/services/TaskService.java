package com.flavio.api.services;

import com.flavio.api.models.Task;
import com.flavio.api.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return repository.findById(id);
    }

    public Optional<Task> getTaskByIdProjectId(Long idTask, Long idProject) {
        return repository.findByIdProjectId(idTask, idProject);
    }

    public Task saveTask(Task task) {
        return repository.save(task);
    }

    public void deleteTask(Long id) {
        repository.deleteById(id);
    }

    public void updateTask(Task task) {
        repository.save(task);
    }
}
