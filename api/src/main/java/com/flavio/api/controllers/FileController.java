package com.flavio.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.models.File;
import com.flavio.api.services.FileService;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService FileService;

    public FileController(FileService FileService) {
        this.FileService = FileService;
    }

    @GetMapping("/")
    public List<File> getAllFiles() {
        return FileService.getAllFiles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<File>> getFileById(@PathVariable Long id) {
        Optional<File> File = FileService.getFileById(id);
        return File.isPresent() ? ResponseEntity.ok(File) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(File);
    }

    @PostMapping("/")
    public ResponseEntity<File> createFile(@RequestBody File File) {
        File savedFile = FileService.saveFile(File);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFile);
    }

    @PutMapping("/{id}")
    public void updateFile(@PathVariable Long id, @RequestBody File File) {
        if (FileService.getFileById(id).isPresent())
            FileService.updateFile(File);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable Long id) {
        if (FileService.getFileById(id).isPresent()) {
            FileService.deleteFile(id);
            return ResponseEntity.ok("Tarea eliminada correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarea no encontrada.");
        }
    }
}
