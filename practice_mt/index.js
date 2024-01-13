const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const dbData = require("./dbData.js");

app.use(cors({
    origin: "http://127.0.0.1:5500/",
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json());
// console.log(dbData);

// 정적 파일 서빙 설정
app.use(express.static(__dirname));


app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/main.html")
});


app.get("/posts/:name?", (req, res) => {
    const { name } = req.params;
  
    if (name) {
        const post = dbData.find(post => post.Name === name);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } else {
        res.json(dbData);       // name이 입력안되면 모든 데이터 출력
    }
});

app.post('/posts', function (req, res) {        // 새로운 데어티 생성
    const obj = req.body;  // 새로운 데이터를 요청에서 받아옴
    dbData.push(obj);  // 새로운 데이터를 배열에 추가
    console.log(dbData[dbData.length - 1]);  // 새로 추가된 데이터 출력
    console.log(dbData.length);
-    res.send(obj);  // 클라이언트에게 추가된 데이터를 응답으로 보냄
  });

app.put('/posts/:name', function (req, res) {       // 기존 데이터 수정
    const { name } = req.params;
    const obj = req.body;
    if(!obj.Name){
        obj.Name = name;
        }
    dbData.splice(name, 1, obj);
    console.log(obj);
    res.send(obj);

  });

app.delete('/posts/:name', function (req, res) {
    const { name } = req.params;

    // dbData 배열에서 해당 name을 가진 데이터를 찾아 삭제
    const indexToRemove = dbData.findIndex(post => post.Name === name);
    if (indexToRemove !== -1) {
        dbData.splice(indexToRemove, 1);
        res.status(204).send(); // 204 No Content 응답을 보냄
        console.log(name);
    } else {
        res.status(404).json({ error: "Post not found" });
    }
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}) 