package com.flavio.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.models.File;
import com.flavio.api.services.FileService;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.Optional;

@Tag(name = "Ficheros", description = "Operaciones relacionadas con ficheros")
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService FileService;

    public FileController(FileService FileService) {
        this.FileService = FileService;
    }

    @Operation(summary = "Endpoint para obtener todos los ficheros")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve todos los ficheros"),
            @ApiResponse(responseCode = "404", description = "Fichero con un id especifico no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/")
    public List<File> getAllFiles() {
        return FileService.getAllFiles();
    }

    @Operation(summary = "Endpoint para obtener un fichero")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve el fichero con un id determinado"),
            @ApiResponse(responseCode = "404", description = "Fichero con un id especifico no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Optional<File>> getFileById(@PathVariable Long id) {
        Optional<File> File = FileService.getFileById(id);
        return File.isPresent() ? ResponseEntity.ok(File) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(File);
    }

    @Operation(summary = "Endpoint para crear un fichero")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Crea el fichero"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping("/")
    public ResponseEntity<File> createFile(@RequestBody File File) {
        File savedFile = FileService.saveFile(File);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFile);
    }

    @Operation(summary = "Endpoint para actualizar un fichero dado su id")
    @PutMapping("/{id}")
    public void updateFile(@PathVariable Long id, @RequestBody File File) {
        if (FileService.getFileById(id).isPresent())
            FileService.updateFile(File);
    }

    @Operation(summary = "Endpoint para eliminar un fichero dado su id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Elimina la tarea"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
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
