class UserStorage {
    loginUser(id, password) {
        return new Promise ( (resolve, reject) => {
            setTimeout(() => {
                if (id === 'richard' && password === 'asiae') {
                resolve(id);
                // console.log(id);  ->.then ( (user) => UserStorage.getRoles(user)) 이 실행되기전에 실행됨.
                } else {
                    reject(new Error ('not Found'));
                }
            }, 2000); 
        });
    }


    getRoles(user) {
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                if (user === 'richard') {
                    resolve({name: 'richard', role:'admin'});
                } else {
                    reject(new Error ('no access'));
                }
            }, 1000);
        });
    }
}

const UserStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

UserStorage.loginUser(id, password)
//    .then ( user => console.log(user)) // --> 이게 실행되면 이후로 .then ( (user) => UserStorage.getRoles(user)) 이 실행되지 않음
    .then ( user => user) // user 를  user 하면 new Promise를 자기가 알아서 만들어서 다음 .then을 실행한다.
    .then (user => {console.log(user); return user;}) // user를 console에서 먼저 찍고 (위에 함수와 상관없음), new promise를 알아서 만든 user를 return 한다. -> 즉, 밑에 구문 실행 해서 리턴한다는 뜻!
    .then ( (user) => UserStorage.getRoles(user)) // --> UserStorage.loginUser(id, password)(->첫번째 줄 실행) 에 대한 resolve, reject이 호출 될때까지 기다린 후, .then을 실행
    .then ( (userWithRole) => {alert(`Hello ${userWithRole.name}, You have a ${userWithRole.role}.role`);})
    .catch ( (error) => console.log(error) )