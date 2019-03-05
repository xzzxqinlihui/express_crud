/*
 * @Author: 秦立辉
 * @Date: 2018-12-28 14:31:48 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-06 22:10:30
 * 对单独去和操作的用户数据的服务封装
 * 
 */
// module.exports = {
// };

//  加载json文件模块
const dbjson = require( "../db.json" );
const fs = require( "fs" );
const path = require( "path" );

//  获取所有的用户数据
exports.getUsers = function(){
    if( !dbjson || !dbjson.users ){
        return [];
    }
    return dbjson.users;
};


//  page第几页   size一页多少条
exports.getPageUsers = function( page,size ){

    //  page:必须是数字类型，而且值必须大于0
    if( typeof(page) !== "number" || page <= 0 ){
        return{
            code:0,
            msg:"page的参数的类型不符合条件"
        }
    }
    if( typeof(size) !== "number" || size <= 0 ){
        return{
            code:0,
            msg:"size的参数的类型不符合条件"
        }
    }
    //  排序
    dbjson.users.sort( (a,b) =>  b.id - a.id  );

    return {
        users:dbjson.users.slice( (page-1) * size, page * size ),
        count:dbjson.users.length,
        code:1,
        msg:"获取成功！"
    }
};

//  把数据保存到db.json文件中
exports.addUser = function(user){
    //判断user对象的数据是否hfa
    if( !user.name ){
        return {
            msg:"用户名不能空",
            code:0
        }
    }

    //user.id  //自动复制ID  可以用Date.now()
    const newUser = Object.assign( {id:Date.now()},user );

    //把数据保存到db.json 中
    dbjson.users.push( newUser );

    //  把数据保存到dbjson文件中
    _saveJson( dbjson );
    return{
        msg:"保存成功",
        code:1
    }

};

//  删除用户信息
exports.delUser = function(id){
    if( typeof(id) === "number" && id > 0 ){
        const index = dbjson.users.findIndex( u => u.id == id );
        dbjson.users.splice( index,1 );
        _saveJson( dbjson );
        return {
            code:1,
            msg:"删除成功"
        }
    }

    return {
        code:0,
        msg:"删除失败！id必须是大于0的整数"
    }
};

//  #region 修改用户信息
//  通过id查找数据
exports.getUserById = function(id){
    if( typeof(id) ===  "number" && id > 0 ){
        return dbjson.users.find( u => u.id == id );
    }
    return null;
};
//  
exports.editUser = function(user){
    if( user && typeof(user.id) === "number" && user.id > 0 ){
        //  修改操作
        const editIndex = dbjson.users.findIndex( u => u.id ==user.id );
        dbjson.users.splice( editIndex,1,user );
        _saveJson( dbjson );        
        
        return {
            msg:"修改成功",
            code:1,
            data:user
        }
    }
    return {
        msg:"要修改的数据不符合规范",
        code:0,
        data:user
    }
}
//  #endregion

//把对象转成  json字符串并保存到  db.json文件中
function _saveJson(jsonData){
    const strJson = JSON.stringify(jsonData);   //js语言中的一个方法：把一个对象转成json字符串
    fs.writeFileSync( path.join(__dirname,"../db.json"),strJson,{encoding:"utf8"} );
}