1. templates 폴더에 html 파일로 응답하기

- Jinja2 Templates 사용하기
  - from fastapi import Request
  - from fastapi.templating import Jinja2Templates
  - templates = Jinja2Templates(directory='templates')
  -
  - @router.get("/")
  - def root(request: Request):
  -     return templates.TemplateResponse("index.html", {"request": request})
  
- Request 객체
  - request.client : Address(host, port  정보)
  - request.url.path
  - request.headers['content-type']
  - request.path_params['query_string']
  