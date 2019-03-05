const fs = require( "fs" );
const path = require( "path" );
const Mock = require( "mockjs" );

const jsondb = require( "./db.json" );

//  初始化users属性
jsondb.users || (jsondb.users =[]);

// #region
// for( var i = 0;i < 45;i++ ){
//     jsondb.users.push(
//         {
//             "id":10000+i,
//             "name":"laoma"+i,
//             "name":"23234"+i,
//             email:"6579807899@78908790.com"
//         }
//     );
// }
//  #endregion
let data = Mock.mock({
    "users|133":[
        {
            "id|+1" :20000,
            "name":"@cname",
            "email":"@email",
            "phone":"@natural( 13000000000,13999999999 )",
            "address":"@county(true)",
            "zip":"@zip",
            "birthday":"@date( 'yyyy-MM-dd' )"
        }
    ]
});

//  es6中的展开运算符，展开字符串，对象，数组
jsondb.users.push( ...data.users );
// jsondb.users = data.users;

fs.writeFileSync( path.join(__dirname,"db.json"),JSON.stringify(jsondb),{
    encoding:"utf8"
} );