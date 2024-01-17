const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const dbData = require("./dbData.js");
const maria = require('./maria.js'); // MariaDB 연동 추가

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

//산 정보 불러오기
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


// DB 불러오기
app.get("/mylist", async (req, res) => {
    try {
        // 쿼리 실행
        const results = await maria.query("SELECT * FROM board");
        console.log("Query Results:", results);

        // results가 배열이 아닌 경우 배열로 변환
        if (!Array.isArray(results)) {
            results = [results];
        }

        // 필요한 데이터만 추출하여 새로운 객체로 만듦
        const sanitizedResults = results.map(result => ({
            Name: result.mountain_name,
            Height: result.height,
            Place: result.place,
            Description: result.description
        }));

        res.json(sanitizedResults);
    } catch (error) {
        console.error("데이터 불러오기 중 에러가 발생했습니다.", error);
        res.status(500).json({ error: "fail" });
    }
});






app.post("/regist", async function (request, response) {
    console.log(request.body);
    var name = request.body.name;
    var height = request.body.height;
    var place = request.body.place;
    var description = request.body.description;

    try {
        // mariaDB에 데이터 삽입
        await maria.query("INSERT INTO board (mountain_name, height, place, description) VALUES (?, ?, ?, ?)", [name, height, place, description]);
        
        // 저장된 데이터를 다시 클라이언트에게 전송
        response.status(200).json({
            name: name,
            height: height,
            place: place,
            description: description,
            message: "success"
        });
    } catch (error) {
        console.error("등록 중 에러가 발생했어요!!", error);
        response.status(500).json({ error: "fail" });
    }
});



app.put('/posts/:name', function (req, res) {
    // MariaDB에서 데이터를 수정할 수 있도록 수정
});

app.delete('/posts/:name', function (req, res) {
    // MariaDB에서 데이터를 삭제할 수 있도록 수정
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