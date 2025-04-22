package com.flavio.api.services;

import com.flavio.api.models.Email;
import com.flavio.api.repositories.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmailService {

    @Autowired
    private EmailRepository repository;

    public List<Email> getAllEmails() {
        return repository.findAll();
    }

    public Optional<Email> getEmailById(Long id) {
        return repository.findById(id);
    }

    public Email saveEmail(Email email) {
        return repository.save(email);
    }

    public void deleteEmail(Long id) {
        repository.deleteById(id);
    }

    public void updateEmail(Email email) {
        repository.save(email);
    }
}
