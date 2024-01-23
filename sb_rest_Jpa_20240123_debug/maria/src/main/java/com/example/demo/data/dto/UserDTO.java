package com.example.demo.data.dto;

import com.example.demo.data.request.UserSearchRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	
	private Integer id;
    private String name;
    private Integer age;
    
    public UserDTO(UserSearchRequest request) {
    	this.id = request.getId();
        this.name = request.getName();
        this.age = request.getAge();
    }

}
