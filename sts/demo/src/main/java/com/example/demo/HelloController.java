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

@RequiredArgsConstructor
//@RestController		// @RestController = @Controller + @ResponseBody 를 합친것! 
@Controller
public class HelloController {
    @GetMapping("/hello")
    @ResponseBody
    public String hello() {
        return "Hello World !!!";
    }
    
    private final UserRepository userRepository;
    
    
    @GetMapping("/list")
	//@ResponseBody 를 붙이면 그냥 return 값이 출력이고, 붙이지 않으면 template가 return 된다
	public String list(Model model) {
    	List<User> userList = this.userRepository.findAll();	//Entity로 받겠다
    	model.addAttribute("userList", userList);
	    return "user_list";
  }
    
    @GetMapping("/list/{id}")
	@ResponseBody
	public String list_id(Model model, @PathVariable("id") Integer id) {
//    	List<User> userList = this.userRepository.findAll();
//    	model.addAttribute("userList", userList);
    	System.out.println(id);
	    return String.format("%d", id);
  }
    
    
    @GetMapping("/listdb/{id}")
	@ResponseBody
	public User list_id_db(Model model, @PathVariable("id") Integer id) {
//    	List<User> userList = this.userRepository.findAll();
    	User user;
    	Optional<User> finded_user = this.userRepository.findById(id);
    	user = finded_user.get();
//    	model.addAttribute("userList", userList);
    	System.out.println(id);
	    return user;
  }
    
    
    @GetMapping("/listdbth/{id}")
//	@ResponseBody
	public String list_id_dbth(Model model, @PathVariable("id") Integer id) {
//    	List<User> userList = this.userRepository.findAll();
    	User user;
    	Optional<User> finded_user = this.userRepository.findById(id);
    	user = finded_user.get();
    	model.addAttribute("user_key", user);	//user_key: entity 객체에 한개를 갖고온다. html 파일에 user : ${userList}"를 user : ${user_key}"로 바꿈
    	System.out.println(id);
	    return "user_list";
  }
    
    
    @PostMapping("/userdb/create")
	@ResponseBody
	public String create_userdb(Model model, @RequestBody User newUser) {		//@RequestBody가 알아서 entity 구조로 바꿔준다.
//    	List<User> userList = this.userRepository.findAll();
    	User created_user = this.userRepository.save(newUser);
//    	model.addAttribute("user_key", user);
	    return "created_user";
  }
    
    
}