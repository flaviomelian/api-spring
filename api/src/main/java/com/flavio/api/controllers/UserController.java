package com.flavio.api.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.models.User;
import com.flavio.api.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Usuarios", description = "Operaciones relacionadas con usuarios")
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }
    
    @Operation(summary = "Endpoint para obtener todos los usuarios")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Devuelve los usuarios"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/")
    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Operation(summary = "Endpoint para obtener un usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve el usuario con un id determinado"),
            @ApiResponse(responseCode = "404", description = "Usuario con un id especifico no encontrado"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable long id) {
        return this.userService.getUserById(id);
    }

    @Operation(summary = "Endpoint para crear un usuario")
    @PostMapping("/")
    public void createUser(@RequestBody User user) {
        this.userService.saveUser(user);
    }
    
    @Operation(summary = "Endpoint para actualizar un usuario dado su id")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Actualiza el usuario"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User updatedUser) {
        Optional<User> userToUpdate = this.userService.getUserById(id);

        if (userToUpdate.isPresent()) {
            User existingUser = userToUpdate.get();
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setName(updatedUser.getName());
            existingUser.setSurnames(updatedUser.getSurnames());
            existingUser.setSalary(updatedUser.getSalary());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setRole(updatedUser.getRole());
            this.userService.updateUser(existingUser);
            return ResponseEntity.ok(existingUser); // Retornar el usuario actualizado
        } else {
            return ResponseEntity.notFound().build(); // Si no se encuentra, devolver 404
        }
    }

    @Operation(summary = "Endpoint para eliminar un usuario dado su id")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Elimina el usuario"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Optional<User> user = this.userService.getUserById(id);

        if (user.isPresent()) {
            this.userService.deleteUser(((User)(user.get())).getId());
            return ResponseEntity.ok("Usuario eliminado correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
        }
    }

    @Operation(summary = "Endpoint para iniciar sesión")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Inicia sesión"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor"),
            @ApiResponse(responseCode = "403", description = "Error de autenticación")
    })
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();

        User loggedInUser = this.userService.login(username, password);

        if (loggedInUser != null) return ResponseEntity.ok(loggedInUser);
        else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @Operation(summary = "Endpoint para realizar un registro")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Registra un usuario"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {

        User loggedInUser = this.userService.signup(user);

        if (loggedInUser != null) return ResponseEntity.ok(loggedInUser);
        else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

}