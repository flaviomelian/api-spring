package com.flavio.api.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.flavio.api.models.User;

public interface UserRepository extends JpaRepository<User, Long>{}