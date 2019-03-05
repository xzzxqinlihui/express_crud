const express = require("express");
const userService = require( "../service/userService.js" );
//  创建一个 router对象
const router = express.Router();

//  router对象相当于我的app对象  app.get post all .. 处理客户端的消息
router.get( "/userlist",(req,res) => {
    // res.render( "stus/index.art" );
    res.json( userService.getUsers() );
} );

//  GET  api/pageuser
router.get( "/pageuser",(req,res) =>{
    //  要求用户传来数据  page  size
    //  返回数据    {page:3,size:10,count:100,data:{}}
    let pageIndex = parseInt(req.query.page);
    pageIndex = (isNaN(pageIndex) || pageIndex <= 0) ? 1 : pageIndex;
    let pageSize = parseInt(req.query.size);
    pageSize = (isNaN(pageSize) || pageSize <= 0) ? 10 : pageSize;

    const data = userService.getPageUsers( pageIndex,pageSize );

    res.json({
        page:pageIndex,
        size:pageSize,
        data:data.users,
        count:data.count
    }); 
} );

//  处理删除功能
router.post( "/deluser/:id",(req,res) => {
    const id = parseInt( req.params.id );
    if( isNaN(id) ){
        res.json({msg:"删除失败，ID不符合规范",code:0});
        return;
    }

    // res.json(userService.delUser(id ));
} );

//  处理添加功能
router.post( "/useradd",(req,res) => {
    // res.json({"msg":"添加成功"});
    res.json( userService.addUser( req.body ) );
} );

//  post方式  /api/userupdate
router.post( "/userupdate",(req,res) => {
   var user = Object.assign( {},req.body,{id:parseInt(req.body.id)} );
    
    res.json( userService.editUser( user ) );
} );
module.exports = router;