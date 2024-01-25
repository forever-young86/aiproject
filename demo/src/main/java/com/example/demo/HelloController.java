package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

//@RestController      // @RestController = @Controller + @ResponseBody 를 합친것! 
@Controller
public class HelloController {

	@GetMapping("/")
	public String hello() {
	    return "layout";
	}
	
    @GetMapping("/list/{id}")
    @ResponseBody
    public String list_id(Model model, @PathVariable("id") Integer id) { 
    	// @PathVariable("id") 아이디 값을 가져와서 Integer id 변수에 매칭 시켜준다.
//    	List<User> userList = this.userRepository.findAll();
//    	model.addAttribute("userList", userList);
    	System.out.println(id);
    	return String.format("%d", id);
    }
    
            
    // DB에 데이터 주입
/*    @PostMapping("/userdb/create")
    @ResponseBody
    public User create_userdb(Model model, @RequestBody User newUser) {  
//    	User created_user = this.userRepository.save(newUser); 
//    	User user;
    	User created_user = this.userRepository.save(newUser);
    	System.out.println(created_user);
    	return created_user;
    }
    */

    
  
}
