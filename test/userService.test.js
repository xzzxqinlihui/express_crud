// 单元测试 BDD
//  npm install -global mocha
//  npm install -save-dev mocha

const userService = require( "../service/userService.js" );
const assert = require( "assert" );
const should = require( "should" );
//  一个单元测试：
//  1定义一个场景，场景初始化数据
//  2开始调用测试的单元代码执行
//  3让后检查执行的结果是否为我们的预期结果
//  如果是：测试通过  如果不是  不通过
//  4清理测试现场的数据


// eg
//  定义一个测试场景    第一个参数：场景的描述  第二个参数：测试场景的回调函数
describe( "userService服务测试",function(){

    //  初始化场景的数据BDD  before : 所有的测试动力执行之前先执行的代码
    before(function(){
        console.log( "before ..." );
        //  一般会做数据的初始化
        require( "../initData.js" );    //  初始化db.json文件的代码
    });

    //  所有的测试用例执行完成后，执行的代码
    after(function(){
        //做一些清理的工作
        console.log( "after ..." );
    });

    //  定义测试用例：测试getUsers方法是否达到我们的预期
    it("#getUsers()",function(){
        //  这个方法执行后，返回一个数组
        var arr = userService.getUsers();
        //  Array.isArray(arr) === true;
        assert.equal( Array.isArray(arr),true );
        assert.equal( arr.length > 33,true );
    });

    //  #region node原生的assert方法
    // it( "#getPageUsers()",function(){
    //     console.log( "sss" );
    //     //  数据
    //     const data = userService.getPageUsers( 2,10 );
    //     // { user:[],coder1,msg:"获取分页成功" }
    //     //  测试正常参数
    //     assert.equal( data.users.length,10 );
    //     assert.equal( Array.isArray(data.users),true );


    //     //  测试异常数据
    //     const eData = userService.getPageUsers( "2","10" );
        
    //     assert.equal( eData.users.length,10 );
    //     assert.equal( Array.isArray(eData.users),true );

    //     assert.equal( eData.code, 0 ,"如果传入非法的page，返回code为0" );
    //     assert.equal( eData,{
    //         code:0,
    //         msg:"page的参数的类型不符合条件"
    //     },"传入非常参数，应该返回对象。。。" );
    // } );
     //#endregion
     it( "#getPageUsers() 用shouldjs",function(){
         const data = userService.getPageUsers( "m",333 );

         data.should.be.a.Object();
         data.code.should.eqls(0);
        //  第一种写法
         data.should.eqls({
                code:0,
                msg:"page的参数的类型不符合条件"
        } );
         // 另一种写法   
        should(data).eql({
            code:0,
            msg:"page的参数的类型不符合条件"
        });

        data.code.should.aboveOrEqual(0);

        userService.getPageUsers(2,"uio").should.eql({
            code:0,
            msg:"size的参数的类型不符合条件"
        });

        const edata = userService.getPageUsers( 2,5 );
        edata.should.be.a.Object();
        edata.code.should.eql( 1 );
        edata.users.length.should.eql( 5 );

        //  特殊情况
        // var t = Object.create( null );
        // t.should //不可以用
        // should(t).be.a.Object();    //可以用

     } );

     // #region  测试删除功能
     it( "#delUser()功能的测试",function(){
         // 正常删除数据
         const t = userService.delUser(20004);
         t.should.eqls({
            code:1,
            msg:"删除成功"
         });

         userService.delUser("dfds").should.eqls({
            code:0,
            msg:"删除失败！id必须是大于0的整数"
         });

         userService.delUser(0).should.eqls({
            code:0,
            msg:"删除失败！id必须是大于0的整数"
         });



     } );
     // #endregion

     // #region     测试通过id查询功能
    it( "#getUserById() 方法测试",function(){
        should(userService.getUserById(-8)).be.null();
        should(userService.getUserById("333")).be.null();
        should(userService.getUserById(20007)).be.containEql({
            id:20007
        });

    } );
     // #endregion
} );