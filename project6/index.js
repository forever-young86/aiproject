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

app.get("/", (req, res)=> {
    // res.send("rest api server");
    res.sendFile(__dirname + "/main.html")
});

/* app.get("/posts", (req, res)=> {
    // const { postId } = req.query;
    const pppId = req.query.postId;
    if (pppId) {
        res.send(dbData[pppId - 1])
    }
    else {
    res.send(dbData);
    }
}); */

app.get("/posts/:pid?", (req, res) => {
    const { pid } = req.params;
    
    if (pid) {
        const post = dbData.find(post => post.id === parseInt(pid));
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } else {
        res.json(dbData);       // pid 입력안되면 모든 데이터 출력
    }
});

app.post('/posts', function (req, res) {
    const obj = req.body;
    obj.id = dbData.length + 1;
    dbData.push(obj);
    console.log(dbData.length);
    console.log(dbData[dbData.length - 1]);
    res.send(obj);
  });

app.put('/posts/:pid', function (req, res) {
    const { pid } = req.params;
    const obj = req.body;
    console.log(pid);
    if(!obj.id){
        obj.id = pid;
        }
    dbData.splice(pid - 1, 0, obj);
    console.log(dbData[pid - 2]);
    console.log(dbData[pid - 1]);
    console.log(dbData[pid]);
    res.send(obj);
  });

app.delete('/posts/:pid', function (req, res) {
    const { pid } = req.params;
    const obj = dbData[pid - 1];
    console.log(pid);
    console.log(obj)
    dbData.splice(pid - 1, 1);
    console.log(dbData[pid - 2]);
    console.log(dbData[pid - 1]);
    console.log(dbData[pid]);
    res.send(obj);
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}) 