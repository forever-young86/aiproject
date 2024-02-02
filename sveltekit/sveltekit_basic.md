# sveltekit 특성
    - +page.svelte => html 분리
    - +pgae.server.js => javascript 분리

# Routing
    - Linked Routes
    - Nested Routes

## Linked Routes 

- HTML `<a>` tag 와 동일

## Nested Routes

    - root
        - src/routes => '/'
    - default
        - 폴더명 구조
    - queryString
        - /path_url?key=value&key2=value2
    - pathParameter
        - 폴더명을 [] 로 감싸 준다
            - /path_url/path
            - /path_url/[Id](예)
