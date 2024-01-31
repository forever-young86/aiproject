const promise = new Promise((resolve, reject) => { //executor : new Promise ()가 만들어질때 바로 실행하는 함수(실행자),(resolve, reject) 는 콜백함수
    console.log('doing something...'); 
    setTimeout( () => {

       // reject(new Error('no network'));
        resolve('richard');
    }, 2000);
});

promise.then( value => {
    console.log(value);
})

.catch( error => {
    console.log(error);
});

const resolve = () => {};