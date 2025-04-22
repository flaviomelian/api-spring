package com.flavio.api.services;

import com.flavio.api.models.File;
import com.flavio.api.repositories.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FileService {

    @Autowired
    private FileRepository repository;

    public List<File> getAllFiles() {
        return repository.findAll();
    }

    public Optional<File> getFileById(Long id) {
        return repository.findById(id);
    }

    public File saveFile(File file) {
        return repository.save(file);
    }

    public void deleteFile(Long id) {
        repository.deleteById(id);
    }

    public void updateFile(File file) {
        repository.save(file);
    }
}
