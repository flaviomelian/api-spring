package com.flavio.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.api.models.User;
import com.flavio.api.services.UserService;
import com.flavio.api.repositories.UserRepository;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private UserService userService;
    private UserRepository userRepository;

    public UserController(UserService userService){
        this.userService = userService;
    }
    
    @GetMapping("/")
    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable long id) {
        return this.userService.getUserById(id);
    }

    @PostMapping("/")
    public void createUser(@RequestBody User user) {
        this.userService.saveUser(user);
    }
    
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

}