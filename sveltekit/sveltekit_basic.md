# sveltekit 특성
    - +page.svelte => html 분리
    - +pgae.server.js => javascript 분리

# Routing
    - Linked Routes
    - Nested Routes

## Linked Routes 

- HTML `<a>` tag 와 동일

## Default Routes

    - root
        - src/routes => '/'
    - default
        - 폴더명 구조
    - queryString
        - /path_url?key=value&key2=value2
        - searchParams 의 get method 사용하여 값 추출
    - pathParameter
        - 폴더명을 [] 로 감싸 준다
            - /path_url/path
            - /path_url/[Id](예)
            - +page.svelte 에서 구조분해할당으로 값 추출
    

## Nested Routes

    - 중첩 구조
        - root/path/[pathParameter]/path/[pathParameter]
    

## Rest Routes

    - 통합 구조
        - [] 안에 ... 연산자를 사용하여 표현


## Optional Routes

    - 조건 분기 구조
        [[ ]] 로 표현


## Matching 

    - 필터링 구조
        - 폴더명 ->  src/params 폴더명 : 고정 컨벤션
        - 파일 내부 method name -> match : 고정 컨벤션
        - 정규표현식을 / ~~~ / 내부에 사용
        - javascript 에서 제공하는 정규식 처리 함수 -> test()
        - match method 파일명을 적용하려는 path parameter 에 적용
            - [userId = integer]