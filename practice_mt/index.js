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


// Oracle DB 연동을 위한 패키지 설치
// npm install oracledb
const oracledb = require('oracledb');
const dbConfig = require('./dbConfig.js');
const dotenv = require('dotenv');

dotenv.config(); 

// 정적 파일 서빙 설정
app.use(express.static(__dirname));


app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/main.html")
});


/* app.get("/posts/:name?", (req, res) => {
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
}); */


app.get("/posts", (req, res) => {
    const { name, place} = req.query;

    if (name) {
        const post = dbData.find(post => post.Name === name);
        res.json(post);
        } else if ( place ) {
        const post = dbData.filter(post => post.Place.includes(place));  // 단어가 포함된것은 모든 결과 
        res.json(post);
        } else {
        res.json(dbData);       // name이 입력안되면 모든 데이터 출력
        }
});



/* app.post('/posts', function (req, res) {        // 새로운 데어티 생성
    const obj = req.body;  // 새로운 데이터를 요청에서 받아옴
    dbData.push(obj);  // 새로운 데이터를 배열에 추가
    console.log(dbData[dbData.length - 1]);  // 새로 추가된 데이터 출력
    console.log(dbData.length);
-    res.send(obj);  // 클라이언트에게 추가된 데이터를 응답으로 보냄
  }); */

//클라이언트로부터 regist를 요청받으면
app.post("/regist",function(request, response){
    console.log(request.body);
    //오라클에 접속해서 insert문을 실행한다. 
    var name = request.body.name;
    var height = request.body.height;
    var place = request.body.place;
    var description = request.body.description;

        //쿼리문 실행 
        conn.execute("insert into search_results(search_results_id,name,height,place,description) values(seq_search_results.nextval,'"+name+"','"+height+"','"+place+","+description+"')",function(err,result){
            if(err){
                console.log("등록중 에러가 발생했어요!!", err);
                response.writeHead(500, {"ContentType":"text/html"});
                response.end("fail!!");
            }else{
                console.log("result : ",result);
                response.writeHead(200, {"ContentType":"text/html"});
                response.end("success!!");
            }
        });
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