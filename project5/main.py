from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
app = FastAPI()

origins = [
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_hearder=["*"]
)


@app.get("/hello")
def hello():
    return {"message": "Hello Rest API Server"}