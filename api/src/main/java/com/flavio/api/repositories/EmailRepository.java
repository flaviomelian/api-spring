package com.flavio.api.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.flavio.api.models.Email;

public interface EmailRepository extends JpaRepository<Email, Long>{}