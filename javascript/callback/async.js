
// 예제 1번
/* async function f() {
    return 1;
}

// * return 값을 알아서 받기 때문에 아래와 같이 써도 다 결과는 동일하다 (알아서 promise를 리턴한다!)


//f().then(alert);
f().then(value => alert(value));
//f().then(value => console.log(value));
f().then(console.log); */


function func() {
    return new Promise ( (resolve, reject) => {
        setTimeout( () => resolve("일반함수 반환값"), 1000);
    });
}



// 예제 2번
async function f() {
    let promise = new Promise ( (resolve, reject) => {
        setTimeout( () => resolve("완료"), 1000);
    });

    let result = await promise;

    alert(result);      // "완료" 먼저 나오고

    let func_result = await func();

    alert(func_result);     // "일반함수 반환값" 나온다
}

f();
