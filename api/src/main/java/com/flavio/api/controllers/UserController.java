package com.flavio.api.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flavio.api.models.User;
import com.flavio.api.services.UserService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/users")
public class UserController {
    
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }
    
    @GetMapping("/")
    public List<User> getAllUsers(@RequestParam String param) {
        return this.userService.getAllUsers();
    }

    @PostMapping("/")
    public User postMethodName(@RequestBody User user) {
        return this.userService.saveUser(user);
    }
    
    @PutMapping("path/{id}")
    public void putMethodName(@PathVariable String id, @RequestBody String entity) {
       this.userService.getUserById(null);
    }
}