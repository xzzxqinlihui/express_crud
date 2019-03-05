const express = require( "express" );
const path = require( "path" );
const art_express = require( "express-art-template" );
const userService = require( "./service/userService.js" );

const app = express();  //  创建app对象

//设置art的模板引擎
app.engine( "art",art_express );

//  用express提供的静态目录的中间件
app.use( express.static(path.join( __dirname,"public" )) );

//  动态请求
app.get( "/user/list",(req,res) => {
    // res.send( "abc" );
    // res.end();

    // S => 未分页的数据
    //  res对象的render方法
    //  第一个参数：模板的文件名,默认从根目录下的views文件夹进行搜索查找
    //  第二个参数:给模板的数据
    res.render( "userlist.art",{
        title:"你好",
        content:"大家好，学习前端",
        // users:[ {
        //     name:"laoma",
        //     id:10001,
        // },{
        //     name:"laoma2",
        //     id:10002,
        // } ],
        users:userService.getUsers()
    } );
    E => 未分页的数据
    
    //   //  S => 实现分页
    //   const page = parseInt( req.query.page ) || 1;
    //   const size = parseInt( req.query.size ) || 10;
    //   console.log( page,size );
    //   const data = userService.getPageUsers(page,size);
    //   res.render( "userlist.art",data );
    //   //  E => 实现分页

} );
console.log( "123" );

//  启动监听
app.listen( 58888,() => {
    console.log( "http://172.16.25.108:58888" );
    console.log( "http://172.16.25.108:58888/user/list" );
}  );