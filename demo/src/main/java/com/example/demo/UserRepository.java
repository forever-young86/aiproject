package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	//JpaRepository<User, Integer> : 제네릭스 사용법(Type)
	
}