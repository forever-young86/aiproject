class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => { // 콜백함수
            if (id === 'richard' && password === 'asiae') {
                onSuccess(id);
            } else {
                onError(new Error ('not Found'));
            }
        }, 2000); // 콜백 함수를 2초 뒤에 실행해라
    }

    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'richard') {
                onSuccess({name: 'richard', role:'admin'});
            } else {
                onError(new Error ('no access'));
            }
        }, 1000);
    }
}

const UserStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

UserStorage.loginUser(
    id, 
    password,
    (user) => { // user 이하 callback 함수 (user), (userWithRole), (error) 는 모두 변수!
        UserStorage.getRoles(
            user, 
            (userWithRole) => { // 콜백안의 또 다른 콜백
                alert(`Hello ${userWithRole.name}, You have a ${userWithRole.role}.role`);
            },
            (error) => {
                console.log(error);
            }
        )
    },
    (error) => {
        console.log(error);
    }
);
