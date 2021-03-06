var Router = function(){

}

Router.forwardWithPost = function(url,async,reqBody,callback){
    $.ajax({
        url:url,
        contentType: "application/json",
        type:"POST",
        data:JSON.stringify(reqBody),
        dataType:"json",
        async:async,
        success:function(result){
            callback(reqBody);
        },
        error: function (error) {
            if(url == "/delivery/publication/get/cp1"){
                Router.loadRequest("getPublications",true,Grids.onPublicationHandler);
            }
            else{
                callback(reqBody);
            }

        }
    });
}

Router.forward = function(url,async,callback){
    jQuery.getJSON(url).done(callback)
        .fail(function(data){
            callback(data);
        });
}

Router.forwardAPIRequests = function(url,async,callback){
    jQuery.getJSON(EngineDataStore.getBaseURL()+"../"+url).done(callback)
        .fail(function(data){

        });
}

Router.loadRequest = function(key,async,callBack,params){
    if(params){
        switch(params){
            case "1":
                key = "getViewStructure1";
                break;
            case "MarketingInitiative-Campaign-SubCampaign-CommunicationPlan-CommunicationChannel":
                key = "getTree1";
                break;
        }
        Router.forwardAPIRequests(EngineDataStore.getApiMappingObject()[key],async,function(data){
            callBack(data);
        });
    }
    else{
        Router.forwardAPIRequests(EngineDataStore.getApiMappingObject()[key],async,function(data){
            callBack(data);
        });
    }

}