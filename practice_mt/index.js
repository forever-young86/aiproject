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
        var sql = 'SELECT * FROM board';
        maria.query(sql, function(err, results, field) {
            if (err) {
                console.error("DB 조회 중 에러 발생:", err);
                res.status(500).json({ error: "DB 조회 중 에러 발생" });
            } else {
                // DB에서 받아온 데이터를 콘솔에 출력
               // console.log(results);
                // DB에서 받아온 데이터를 클라이언트로 전송
                res.json(results);
            }
        });
    } catch (error) {
        console.error("DB 조회 중 에러 발생:", error);
        res.status(500).json({ error: "DB 조회 중 에러 발생" });
    }
});


//DB에 정보넣기 
app.post("/regist", async function (request, response) {
    //console.log(request.body);
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



app.put('/mylist/:name', async function (req, res) {
    const { name } = req.params;
    const { Height, Place, Description } = req.body;

    try {
        // MariaDB에서 데이터를 수정
        await maria.query(
            "UPDATE board SET height = ?, place = ?, description = ? WHERE mountain_name = ?",
            [Height, Place, Description, name]
        );

        // 수정된 데이터를 클라이언트에게 응답
        res.status(200).json({
            Height: Height,
            Place: Place,
            Description: Description,
            message: "success"
        });
    } catch (error) {
        console.error("수정 중 에러가 발생했어요!!", error);
        res.status(500).json({ error: "fail" });
    }
});


// mylist 데이터 삭제
app.delete('/mylist/:name', async function (req, res) {
    const { name } = req.params;

    try {
        // MariaDB에서 해당 name을 가진 데이터 삭제
        await maria.query("DELETE FROM board WHERE mountain_name = ?", [name]);

        res.status(204).send(); // 204 No Content 응답을 보냄
        //console.log(name);
    } catch (error) {
        console.error("삭제 중 에러가 발생했어요!!", error);
        res.status(500).json({ error: "fail" });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}) 