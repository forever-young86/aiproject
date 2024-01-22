package com.example.demo;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
class UserDTO {
	
	private String Name;
	private String Email;
}

@Getter
@Setter
class UserEntity {
	
	private String userName;
	private String userEmail;
}

// start jpa -------------------------------------------------------
interface Repository {
	UserEntity save(UserDTO userDTO);
	UserEntity getByName(String userName);
}

class RepositoryImpl implements Repository {
	
	UserEntity userEntity = new UserEntity();
	
	public RepositoryImpl (UserEntity userEntity) {
		this.userEntity = userEntity;
	}
	
	@Override
	public UserEntity save(UserDTO userDTO) {
		this.userEntity.setUserName(userDTO.getName());
		this.userEntity.setUserEmail(userDTO.getEmail());
		return this.userEntity;
	}
	
	@Override
	public UserEntity getByName(String userName) {
		
		if(userName == this.userEntity.getUserName())
			return this.userEntity;
		else
			return null;
	}
	
}

//end jpa----------------------------------------------------

interface UserRepo extends Repository {
}

class UserRepoImpl extends RepositoryImpl implements UserRepo {

	public UserRepoImpl(UserEntity userEntity) {
		super(userEntity);
		// TODO Auto-generated constructor stub
	}

	
}

interface UserDAO {
	
	UserEntity saveUser(UserDTO userDTO);
	
	UserEntity getUser(String userName);
}

class UserDAOImpl implements UserDAO {
	
	UserRepo userRepo;
	
	public UserDAOImpl (UserRepo userRepo) {
		
		this.userRepo = userRepo;
	}
	
	@Override
	public UserEntity saveUser(UserDTO userDTO) {
		return this.userRepo.save(userDTO);
	}
	
	@Override
	public UserEntity getUser(String userName) {
		return this.userRepo.getByName(userName);
	}
}

public class pseudoJpa {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		UserDTO userDTO = new UserDTO();
		UserEntity userEntity = new UserEntity();
		 
		userDTO.setName("richard");
		userDTO.setEmail("richard@gmail.com");
		
		
		UserRepo userRepo = new UserRepoImpl(userEntity);
		
		UserDAO dao = new UserDAOImpl(userRepo);
		
		UserEntity reponseEntity = dao.saveUser(userDTO);
//		System.out.println(dao.getUser("richard").getUserEmail());
		System.out.println(reponseEntity.getUserEmail());
	}
 
	
}
