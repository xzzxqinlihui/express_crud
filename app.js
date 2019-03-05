const express = require("express");
const path = require("path");
const art_express = require("express-art-template");
const userService = require("./service/userService.js");
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5

const app = express();  //  创建app对象

const router = require( "./routers/index.js" );
const apiRouter = require( "./routers/apirouter.js" );


//  #region 添加中间件
app.use(bodyParser.json()); // for parsing application/json
//创建一个upload对象  用于处理 multipart/form-data方式传递  一般是传递文件的时候
const upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.urlencoded({ //  默认处理表单数据到  req.body
    extended: true
})); // for parsing application/x-www-form-urlencoded

app.use( express.static( path.join( __dirname,"public" ) ) );

//添加路由的中间件
app.use( "/stu",router );
//  添加api的中间件
app.use( "/api",apiRouter );


//  #endregion

// #region 用户列表
//设置art的模板引擎
app.engine("art", art_express);

//  用express提供的静态目录的中间件
app.use(express.static(path.join(__dirname, "public")));

//  动态请求
app.get("/user/list", (req, res) => {
    // res.send( "abc" );
    // res.end();

    // S => 未分页的数据
    //  res对象的render方法
    //  第一个参数：模板的文件名,默认从根目录下的views文件夹进行搜索查找
    //  第二个参数:给模板的数据
    // res.render( "userlist.art",{
    //     title:"你好",
    //     content:"大家好，学习前端",
    //     // users:[ {
    //     //     name:"laoma",
    //     //     id:10001,
    //     // },{
    //     //     name:"laoma2",
    //     //     id:10002,
    //     // } ],
    //     users:userService.getUsers()
    // } );
    // E => 未分页的数据

    //  S => 实现分页
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    console.log(page, size);
    const data = userService.getPageUsers(page, size);
    data.page = req.query.page;
    res.render("users/userlist2.art", data);
    //  E => 实现分页

});
//  #endregion

//  #region 添加用户
// 添加用户的列表页面
app.get("/user/add", (req, res) => {
    res.render("users/add.art");
});

//  用POST方法请求  提交表单
app.post("/user/add",upload.array(), (req, res) => {
    // res.send( "ok" );
    //req.query : 获取请求的地址中的参数 http://172.16.25.108:58888/user/list/?page=1&size=20
    //req.param : 通过路由的方式 获取路由参数
    //req.body  : 获取表单的参数
    // console.log("-----S => body-----");
    // console.dir(req.body);
    // console.log("-----S => body-----");
    
    //  把数据保存到db.json文件中
    userService.addUser( req.body );
    res.redirect("/user/list");
});
// #endregion

//  #region 删除操作
app.get("/user/del",(req,res) => {
    // res.send( req.query.id );
    userService.delUser( parseInt(req.query.id) );
    res.redirect( "/user/list" );
});
//  #endregion

//  #region 修改操作
//  显示要修改的用户数据
app.get( "/user/edit",(req,res) => {
    const user = userService.getUserById( parseInt(req.query.id) );
    if ( user == null ) {
        res.redirect( "/user/list" );
    }
    res.render( "users/edit.art",user );
} );

//  用户修改完成后，提交的表单处理
app.post( "/user/edit",(req,res) => {
    let user = Object.assign( {},req.body,{
        id:parseInt( req.body.id )
    } );

    const data = userService.editUser( user );
    if(data.code === 1){
        //  修改成功  跳转到页面
        res.redirect( "/user/list" );
        return;
    }else{
        //  修改失败后，继续显示当前修改的页面
        res.render( "/users/edit.art",req.body );
    }


} );
//  #endregion


//  #region 原生的ajax案例  post请求
    app.post( "/api/user",(req,res) => {
        res.json( req.body );
    } );
//  #endregion

console.log("123");

//  启动监听
app.listen(58888, () => {
    console.log("http://172.16.25.108:58888");
    console.log("http://172.16.25.108:58888/user/list");
});