package com.example.demo;

import java.util.List;
import java.util.Optional;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.BindingResult;


import com.example.demo.User;
import com.example.demo.UserRepository;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/user")
public class UserController {
	
    private final UserService userService;
	private final UserRepository userRepository; 

	 @Autowired
	    public UserController(UserService userService, UserRepository userRepository) {
	        this.userService = userService;
	        this.userRepository = userRepository;
	    }
	
	@GetMapping("/")
	public String hello() {
	    return "layout";
	}
		
    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("param", "");  // param 초기화
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping("/register")
    public String register(@javax.validation.Valid UserCreateForm userCreateForm, BindingResult bindingResult) {
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

