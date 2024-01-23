package com.example.demo.controller.service;

import com.example.demo.data.dto.UserDTO;
import com.example.demo.data.entity.VipUser;
import com.example.demo.data.request.UserSearchRequest;

public interface UserService {
	
	UserDTO getUser(Integer userId);
	VipUser saveUser(UserSearchRequest request);

}
