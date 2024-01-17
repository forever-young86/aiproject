var express = require('express');
var router = express.Router();

//require maria.js
const maria = require('./maria.js');

// Get Page
router.get('/list/:page', async function (req, res, next) {
    try {
        // mariaDB에서 데이터 조회
        const result = await maria.query("SELECT * FROM search_results");
        res.render('list', { title: 'Express', rows: result });
    } catch (error) {
        console.error("데이터 조회 중 에러가 발생했어요!!", error);
        res.status(500).json({ error: "fail" });
    }
});


module.exports = router;