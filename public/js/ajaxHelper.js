/**
 * ajax的get请求辅助方法
 * 
 * 
 */

function ajaxGet( url,callback ){
    var xhr = new XMLHttpRequest();
    xhr.open( "GET",url,true );
    xhr.send();
    xhr.onreadystatechange = function(){
        if( xhr.readyState == 4 && xhr.status == 200 ){
            callback( xhr.responseText );
        }
    };
}



function ajaxPost( url,data,callback ){
    var xhr = new XMLHttpRequest();
    xhr.open( "POST",url,true );
    xhr.setRequestHeader( "Content-type","application/x-www-form-urlencoded" );
    xhr.send(data);

    xhr.onreadystatechange = function(){
        if( xhr.readyState == 4 && xhr.status == 200 ){
            callback( xhr.responseText );
        }
    };
    
}
