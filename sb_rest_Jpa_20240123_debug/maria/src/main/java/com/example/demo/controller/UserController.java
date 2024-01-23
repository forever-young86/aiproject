package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.controller.service.UserService;
import com.example.demo.data.dto.UserDTO;
import com.example.demo.data.entity.VipUser;
import com.example.demo.data.request.UserSearchRequest;

@Controller
@RequestMapping("/user")
public class UserController {
	
	private final UserService userService;
	
	public UserController (UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/{id}")
	public @ResponseBody UserDTO UserInfo(@PathVariable("id") Integer id) {
		
		return userService.getUser(id);
	}
	
	@PostMapping("/create")
	public @ResponseBody VipUser createUser(@RequestBody UserSearchRequest request) {
		return userService.saveUser(request);
	}
}
