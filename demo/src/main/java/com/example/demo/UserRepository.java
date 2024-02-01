package com.example.demo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByusername(String username);

	//JpaRepository<User, Integer> : 제네릭스 사용법(Type)
	
}