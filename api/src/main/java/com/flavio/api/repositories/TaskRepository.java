package com.flavio.api.repositories;

import com.flavio.api.models.Task;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.project.id = ?1 AND t.id = ?2")
    Optional<Task> findByIdProjectId(Long projectId, Long id);
    @Query("SELECT t FROM Task t WHERE t.project.id = ?1")
    List<Task> findByIdProjectId(Long id);
}
