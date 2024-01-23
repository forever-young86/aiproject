package com.example.demo.data.handler.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.data.dao.UserDAO;
import com.example.demo.data.dto.UserDTO;
import com.example.demo.data.entity.VipUser;
import com.example.demo.data.handler.UserDataHandler;

@Service
public class UserDataHandlerImpl implements UserDataHandler {
	
	private final UserDAO userDAO;
	
	@Autowired
	public UserDataHandlerImpl(UserDAO userDAO) {
		this.userDAO = userDAO;
	}
	
	@Override
	public VipUser getUserEntity(Integer userId) {
		
		return userDAO.getUser(userId);
	}
	
	@Override
	public VipUser saveUserEntity(UserDTO userDTO) {
		
		return userDAO.saveUser(userDTO);
	}

}
