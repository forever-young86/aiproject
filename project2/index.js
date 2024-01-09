const express = require("express");   // ES module 은 require 대신에  import 로 쓴다 
const cors = require("cors");
const app = express();
const port = 3000;

const dbData = require("./dbData.js");

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],  // CORS에러 해결용
}));
app.use(express.json());
// console.log(dbData);

app.get("/", (req, res)=> {
    res.send("rest api server");
});

app.get("/posts", (req, res)=> {
    // const { postId } = req.query;  // postId는 dbData에서 객체 하나를 가져오는것 ex)데이터 8번째를 가져오는것. 그안에 UserID라던지 Id와 상관없음!!
    const pppId = req.query.postId;
    if (pppId) {
        res.send(dbData[pppId - 1])
    }
    else {
    res.send(dbData);
    }
});

/* http://localhost:3000/posts?userId=5&postId=8  => fetch() 에 주소가 들어감

http://localhost:3000/posts/5/8 => /posts/:userId/:postId */


app.get("/posts/pid", (req, res)=> {
    const { pid } = req.params; // javascript 구조분해할당
    res.send(dbData[pid - 1]);
});


app.post
('/posts', function (req, res) {
    const obj = req.body;       // 객채 {} 를 그대로 받겠다
    
obj.id
 = dbData.length + 1;
    dbData.push(obj);
    console.log(dbData.length);
    console.log(dbData[dbData.length - 1]);
    res.send(obj);
  });

app.put('/posts/:pid', function (req, res) {      // 지정한 자리에 내용을 넣어라
    const { pid } = req.params;
    const obj = req.body; 
    if (!obj.id){
        obj.id = pid;
    }
    dbData.splice(pid-1, 0, obj);
    console.log(dbData[pid - 1])
    res.send(obj);
  });


app.delete('/posts/', function (req, res) {
    const { pid } = req.query;
    const obj = dbData[pid -1]; 

    dbData.splice(pid-1, 1);
    console.log(dbData[pid - 1])    
    res.send(obj);
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}) 