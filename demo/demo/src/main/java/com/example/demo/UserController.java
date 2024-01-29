package com.example.demo;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;


import com.example.demo.User;
import com.example.demo.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class UserController {
	
    private final UserService userService;
	private final UserRepository userRepository; 

	
	/*
	 * @Autowired public UserController(UserService userService, UserRepository
	 * userRepository) { this.userService = userService; this.userRepository =
	 * userRepository; }
	 */
	 
	@GetMapping("/")
	public String hello() {
	    return "layout";
	}
		
	@GetMapping("/login")
    public String login() {
        return "login";
	}

	
	
    @GetMapping("/register")
    public String register(UserCreateForm userCreateForm) {
        return "register";
    }

    @PostMapping("/register")
    public String signup(@Valid UserCreateForm userCreateForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "register";
        }

        if (!userCreateForm.getPassword1().equals(userCreateForm.getPassword2())) {
            bindingResult.rejectValue("password2", "passwordInCorrect", 
                    "2개의 패스워드가 일치하지 않습니다.");
            return "register";
        }

        userService.create(userCreateForm.getUsername(), 
                userCreateForm.getEmail(), userCreateForm.getPassword1());

        return "redirect:/";
    }
}

