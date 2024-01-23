package com.example.demo.data.dao;

import com.example.demo.data.dto.UserDTO;
import com.example.demo.data.entity.VipUser;


public interface UserDAO {

	VipUser getUser(Integer userId);
	VipUser saveUser(UserDTO userDTO);
}
