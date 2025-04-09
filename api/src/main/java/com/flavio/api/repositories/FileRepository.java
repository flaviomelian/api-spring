package com.flavio.api.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.flavio.api.models.File;

public interface FileRepository extends JpaRepository<File, Long>{}