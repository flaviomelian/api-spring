package com.flavio.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.models.Email;
import com.flavio.api.services.EmailService;
import java.util.List;
import java.util.Optional;

@Tag(name = "Emails", description = "Operaciones relacionadas con el envío de emails internos (en desuso)")
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/emails")
public class EmailController {

    private final EmailService EmailService;

    public EmailController(EmailService EmailService) {
        this.EmailService = EmailService;
    }

    @Operation(summary = "Endpoint para obtener todos los emails")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve los emails"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/")
    public List<Email> getAllEmails() {
        return EmailService.getAllEmails();
    }

    @Operation(summary = "Endpoint para obtener un email dado su id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve la tarea con un id determinado"),
            @ApiResponse(responseCode = "404", description = "Tarea con un id especifico no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Email>> getEmailById(@PathVariable Long id) {
        Optional<Email> Email = EmailService.getEmailById(id);
        return Email.isPresent() ? ResponseEntity.ok(Email) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(Email);
    }

    @Operation(summary = "Endpoint para crear un email que se enviará")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Crea el email"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping("/")
    public ResponseEntity<Email> createEmail(@RequestBody Email Email) {
        Email savedEmail = EmailService.saveEmail(Email);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmail);
    }

    @Operation(summary = "Endpoint para actualizar un email dado su id")
    @PutMapping("/{id}")
    public void updateEmail(@PathVariable Long id, @RequestBody Email Email) {
        if (EmailService.getEmailById(id).isPresent())
            EmailService.updateEmail(Email);
    }

    @Operation(summary = "Endpoint para eliminar un email dado su id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Elimina el email"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmail(@PathVariable Long id) {
        if (EmailService.getEmailById(id).isPresent()) {
            EmailService.deleteEmail(id);
            return ResponseEntity.ok("Email eliminado correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email no encontrado.");
        }
    }
}
