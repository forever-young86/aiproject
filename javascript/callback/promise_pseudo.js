class Promise {
    p_status;
    value;
    e;

    constructor(executor) {
        this.p_status = 'pending';

        // DI
        const resolve = (value) => {
            this.p_status = 'onfulfilled';
            this.value = value;
        };
        const reject = (e) => {
            this.p_status = 'onrejected';
            this.e = e;
        };

        executor(resolve, reject);
    }

    then(success, error) {
        if('onfulfilled') {
            if(this.value) {
              let result = success(this.value); // error 발생시 onrejected 로 상태가 변하고 error 객체를 반환
              if(result === promise) {
                return result;
              } else {
                return new Promise((resolve) => resolve(result));
              }
            } else {
                success();
                return this;
            }
        } else if('onrejected') {
            if(this.e) {
                let result = error(this.e);
                if(result === promise) {
                    return result;
                } else {
                    return new Promise((resolve) => resolve(result));
                }
            } else {
                error();
                return this;
            }
        }
    }
}

const promise = new Promise(executor(resolve, reject) {

    ...
    const callback = () => {
        ...
        let result = ... ;
        resolve(result);
    }
    setTimeout( callback, 3000);
});

const post_success_callback = ( value ) => {
    
    value;
}

promise.then(post_success_callback)

promise.then( (value) => console.log(value))
    .then()