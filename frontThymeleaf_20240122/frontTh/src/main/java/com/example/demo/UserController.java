package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;

	// Model -> View
	@GetMapping("")
	public String writeFunc(Model model) {
		
		List<User> users = userRepository.findAll();
//		User user = users.get(1);
//		System.out.println(user.getId());

		model.addAttribute("users", users);
		return "userList";
	}
	
	@GetMapping("/register")
	public String registerForm(Model model) {
		User user = new User();
		model.addAttribute("user", user);
		return "addUser";
	}
	
	@PostMapping("/register")
	public String userRegister(@ModelAttribute User user) {
		userRepository.save(user);
		return "redirect:/user";
	}
	
	@GetMapping("/{id}")
	public String userInfo(@PathVariable("id") int id, Model model) {
		User user = userRepository.findById(id).orElse(null);
		model.addAttribute("user", user);
		return "userInfo";
	}
}
