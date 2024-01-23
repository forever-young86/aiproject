package com.example.demo.data.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.data.dao.UserDAO;
import com.example.demo.data.dto.UserDTO;
import com.example.demo.data.entity.VipUser;
import com.example.demo.data.repository.UserRepository;

@Service
public class UserDAOImpl implements UserDAO {
	
	UserRepository userRepository;
	
	@Autowired
	public UserDAOImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public VipUser getUser(Integer userId) {
		
		return this.userRepository.getReferenceById(userId);
	}
	
	@Override
	public VipUser saveUser(UserDTO userDTO) {
		
		VipUser user = new VipUser();
		user.setUserId(userDTO.getId());
		user.setUserName(userDTO.getName());
		user.setUserAge(userDTO.getAge());
		user.setAdult(userDTO.getAge() > 19 ? true : false);
		 
		return this.userRepository.save(user);
	}

}
