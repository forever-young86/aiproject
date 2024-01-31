# Promise

- executor
    - 선언과 동시에 등록된 익명 함수는 바로 실행됨
    - 리턴값은 Promise 객체 :: chainning 이 가능한 이유

- resolve
    - 인자없이 함수만 호출 => resolve()
    - 인자와 함께 함수 호출 => resolve(인자)
    - 여러개 인자와 함께 함수 호출 => resolve ([인자1, 인자2, ...])  :: 배열 사용

- reject
    - error 표현을 인자로 Error 객체 사용 => reject(new Error (인자))

- state
    - pending
        - fulfilled
        - rejected

- consumer 
    - then
        - 리턴값은 Promise 객체 :: chainning 이 가능한 이유
    - catch
        - 리턴값은 Promise 객체 :: chainning 이 가능한 이유
    - finally 
        - resolve, reject 상황과 관계없이 맨 마지막에 실행됨