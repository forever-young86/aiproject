package com.example.demo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@Entity
public class User {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)		//properties에 spring.jpa.hibernate.ddl-auto=create로 하면 마리아 디비에 만들어짐 (생성후에는 update로 바꿔야함)
	private Integer id;
	
	@Column(length = 200)
	private String email;
	
	@Column(length = 100)
	private String name;
	
	
}
