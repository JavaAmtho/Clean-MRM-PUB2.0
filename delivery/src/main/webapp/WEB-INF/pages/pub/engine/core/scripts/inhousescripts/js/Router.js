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
 * @description AJAX request to a server only used for config files to read
 */
Router.loadConfigFile = function(url,async,callback){
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
 * @param callback
 * @description AJAX request to a server with GET method
 */
Router.forward = function(url,async,callback){
    $.ajax({
        url:url,
        dataType:"json",
        async:async,
        success:function(result){
            if(result.status === "success"){
                if(result.response)
                    callback(result.response);
                if(result.responseString)
                    callback(result.responseString);
            }else{
                alert("Something went wrong| Please try again later");
            }
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
        type:"POST",
        data:JSON.stringify(reqBody),
        dataType:"json",
        async:async,
        success:function(result){
            if(result.status === "success"){
                if(result.response)
                    callback(result.response);
                if(result.responseString)
                    callback(result.responseString);
            }else{
                alert("Something went wrong| Please try again later");
            }
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


/**
 *
 * @param key
 * @param async
 * @param callBack
 * @param params   This gets append to the url
 * @description common gateway for all POST methods with or without params
 */
Router.loadPhpPostRequest = function(key,async,params,requestBody,callBack){
    if(params){
        Router.forwardWithPost(EngineDataStore.getRestBaseUrl()+EngineDataStore.getApiMappingObject()[key]+params,async,requestBody,function(data){
            callBack(data);
        });
    }
    else{
        Router.forwardWithPost(EngineDataStore.getRestBaseUrl()+EngineDataStore.getApiMappingObject()[key],async,requestBody,function(data){
            callBack(data);
        });
    }
}

/**
 *
 * @param key
 * @param async
 * @param callBack
 * @param params   This gets append to the url
 * @description common gateway for all GET methods with or without params
 */
Router.loadPhpGetRequest = function(key,async,callBack,params){
    if(params){
        Router.forward(EngineDataStore.getRestBaseUrl()+EngineDataStore.getApiMappingObject()[key]+params,async,function(data){
            callBack(data);
        });
    }
    else{
        Router.forward(EngineDataStore.getRestBaseUrl()+EngineDataStore.getApiMappingObject()[key],async,function(data){
            callBack(data);
        });
    }
}
