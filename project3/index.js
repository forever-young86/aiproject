const express = require("express");     // ES module 은 require 대신에  import 로 쓴다 
const app = express();
const port = 3000;

const dbData = require("./dbData.js");

// console.log(dbData);


app.get("/", (req, res)=> {
    res.send("rest api server");
});

app.get("/posts", (req, res)=> {
    const { postId } = req.query;       // postId는 dbData에서 객체 하나를 가져오는것 ex)데이터 8번째를 가져오는것. 그안에 UserID라던지 Id와 상관없음!!
    if (postId) {
    res.send(dbData[postId -1])
    }
    else {
    res.send(dbData);
    }
});

/* http://localhost:3000/posts?userId=5&postId=8  => fetch() 에 주소가 들어감

http://localhost:3000/posts/5/8 => /posts/:userId/:postId */


app.get("/posts/:pid", (req, res)=> {
    const { pid } = req.params;  // javascript 구조분해할당
    //console.log(dbData[pid]);
    res.send(dbData[pid - 1]);
});


app.post('/posts', function (req, res) {
    const obj = req.body;   // 객채 {} 를 그대로 받겠다
    console.log(obj);
    res.send('Got a POST request');
  });


app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
  });
  


app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
  });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})