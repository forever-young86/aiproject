package com.example.demo.data.handler;

import com.example.demo.data.dto.UserDTO;
import com.example.demo.data.entity.VipUser;

public interface UserDataHandler {

	VipUser getUserEntity(Integer userId);
	VipUser saveUserEntity(UserDTO userDTO);
	
}
