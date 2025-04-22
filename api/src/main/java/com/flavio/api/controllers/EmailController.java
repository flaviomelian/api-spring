package com.flavio.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.models.Email;
import com.flavio.api.services.EmailService;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/emails")
public class EmailController {

    private final EmailService EmailService;

    public EmailController(EmailService EmailService) {
        this.EmailService = EmailService;
    }

    @GetMapping("/")
    public List<Email> getAllEmails() {
        return EmailService.getAllEmails();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Email>> getEmailById(@PathVariable Long id) {
        Optional<Email> Email = EmailService.getEmailById(id);
        return Email.isPresent() ? ResponseEntity.ok(Email) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(Email);
    }

    @PostMapping("/")
    public ResponseEntity<Email> createEmail(@RequestBody Email Email) {
        Email savedEmail = EmailService.saveEmail(Email);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmail);
    }

    @PutMapping("/{id}")
    public void updateEmail(@PathVariable Long id, @RequestBody Email Email) {
        if (EmailService.getEmailById(id).isPresent())
            EmailService.updateEmail(Email);
    }

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
