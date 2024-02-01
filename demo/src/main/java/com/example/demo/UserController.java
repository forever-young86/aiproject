package com.example.demo;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.RequiredArgsConstructor;


import com.example.demo.User;
import com.example.demo.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class UserController {
	
    private final UserService userService;
	private final UserRepository userRepository; 
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

	
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
    public String signup(@Valid UserCreateForm userCreateForm, BindingResult bindingResult, RedirectAttributes attributes, Model model) {
        logger.info("Signup method is called with userCreateForm: {}", userCreateForm);

    	
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
        
        
        model.addAttribute("message", "회원 가입 완료!");
        attributes.addFlashAttribute("searchUrl", "/user/login");

        return "redirect:/user/login";
    }
  
}