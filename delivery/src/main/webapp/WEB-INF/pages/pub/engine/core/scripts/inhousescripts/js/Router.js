/**
 *
 * @constructor
 */
var Router = function(){

}

/**
 *
 * @param url
 * @param async
 * @param callback
 * @description AJAX request to a server with GET method
 */
Router.forward = function(url,async,callback){
    $.ajax({
        url:url,
        dataType:"json",
        async:async,
        success:function(result){
            callback(result);
        },
        error: function (error) {
            callback("error");
        }
    });
}

/**
 *
 * @param url
 * @param async
 * @param reqBody
 * @param callback
 * @description AJAX request to a server with POST method
 */
Router.forwardWithPost = function(url,async,reqBody,callback){
    $.ajax({
        url:url,
        contentType: "application/json",
        type:"POST",
        data:JSON.stringify(reqBody),
        dataType:"json",
        async:async,
        success:function(result){
            callback(result);
        },
        error: function (error) {
            callback("error");
        }
    });
}

/**
 *
 * @param key
 * @param async
 * @param callBack
 * @param params   This gets append to the url
 * @description common gateway for all GET methods with or without params
 */
Router.loadRequest = function(key,async,callBack,params){
    if(params){
        Router.forward(EngineDataStore.getApiMappingObject()[key]+params,async,function(data){
            callBack(data);
        });
    }
    else{
        Router.forward(EngineDataStore.getApiMappingObject()[key],async,function(data){
            callBack(data);
        });
    }
}