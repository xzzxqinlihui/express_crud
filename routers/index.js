const express = require("express");

//  创建一个 router对象
const router = express.Router();

//  router对象相当于我的app对象  app.get post all .. 处理客户端的消息
router.get( "/list",(req,res) => {
    res.render( "stus/index.art" );
} );




module.exports = router;