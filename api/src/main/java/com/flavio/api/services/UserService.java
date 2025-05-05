package com.flavio.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.flavio.api.models.User;
import com.flavio.api.repositories.UserRepository;

@Service
public class UserService {
   
    @Autowired
    private UserRepository repository;

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return repository.findById(id);
    }

    public void saveUser(User user) {
        repository.save(user);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public void updateUser(User user) {
       var toUpdate = repository.findById(user.getId());
       if (toUpdate.isPresent()){
        User updatedUser = toUpdate.get();
        updatedUser.setUsername(user.getUsername());
        updatedUser.setName(user.getName());
        updatedUser.setSurnames(user.getSurnames());
        updatedUser.setSalary(user.getSalary());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setRole(user.getRole());
        repository.save(updatedUser);
       }
    }

    public User login(String username, String password) {
        Optional<User> user = repository.findByUsername(username);
        if (user.isPresent()) {
            User foundUser = user.get();
            if (foundUser.getPassword().equals(password)) return foundUser;
        }    
        return null; 
    }

    public User signup(@RequestBody User user) {
        return repository.save(user);
    }

}
