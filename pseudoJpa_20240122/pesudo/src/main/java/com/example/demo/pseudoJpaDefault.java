package com.example.demo;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
class UserDTO_D {
	
	private String Name;
	private String Email;
}

@Getter
@Setter
class UserEntity_D {
	
	private String userName;
	private String userEmail;
}

// start jpa -------------------------------------------------------
interface Repository_D {
	
	UserEntity_D userEntity = new UserEntity_D();
	
	default UserEntity_D save(UserDTO_D userDTO) {
		
		this.userEntity.setUserName(userDTO.getName());
		this.userEntity.setUserEmail(userDTO.getEmail());
		return this.userEntity;
	}
	default UserEntity_D getByName(String userName) {
		
		if(userName == this.userEntity.getUserName())
			return this.userEntity;
		else
			return null;
	}
}

class RepositoryImpl_D implements Repository_D {
}

//end jpa----------------------------------------------------

interface UserRepo_D extends Repository_D {
}

class UserRepoImpl_D implements UserRepo_D {	
}

interface UserDAO_D {
	
	UserRepo_D userRepo = new UserRepoImpl_D();
	
	default UserEntity_D saveUser(UserDTO_D userDTO) {
		return this.userRepo.save(userDTO);
	}
	
	default UserEntity_D getUser(String userName) {
		return this.userRepo.getByName(userName);
	}
}

class UserDAOImpl_D implements UserDAO_D {
}

public class pseudoJpaDefault {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		UserDTO_D userDTO = new UserDTO_D();
//		UserEntity_D userEntity = new UserEntity_D();
		 
		userDTO.setName("richard");
		userDTO.setEmail("richard@gmail.com");
		
		UserDAO_D dao = new UserDAOImpl_D();
		
		UserEntity_D reponseEntity = dao.saveUser(userDTO);
//		System.out.println(dao.getUser("richard").getUserEmail());
		System.out.println(reponseEntity.getUserEmail());

	}

}
