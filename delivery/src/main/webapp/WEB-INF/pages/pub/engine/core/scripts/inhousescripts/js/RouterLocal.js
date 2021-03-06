var Router = function(){

}

Router.forward = function(url,async,callback){
    jQuery.getJSON(url).done(callback)
        .fail(function(data){
            //alert("failed");
            callback(data);
        });
}

Router.forwardWithPost = function(url,async,reqBody,callback){
    if(url == "pub/testdrive/mocks/GetAllPageRules.json"){
        Router.loadRequest("getAllPageRules",true,callback);
    }
    else{
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

}


Router.forwardAPIRequests = function(url,async,callback){
    $.ajax({
        dataType: "json",
        async: async,
        url: EngineDataStore.getBaseURL()+"../"+url,
        success: callback
    });

   /* jQuery.getJSON(EngineDataStore.getBaseURL()+"../"+url).done(callback)
        .fail(function(data){
            //alert("failed");

        });*/
}

Router.loadRequest = function(key,async,callBack,params){

    if(params){

        switch(params){
            case "1":
                key = "getViewStructure1";
                break;
            case "2":
                key = "getViewStructure2";
                break;
            case "3":
                key = "getViewStructure3";
                break;
            case "MarketingInitiative-Campaign-SubCampaign-CommunicationPlan-CommunicationChannel-Publication":
                key = "getTree1";
                break;
            case "Campaign-SubCampaign-MarketingInitiative-CommunicationPlan-CommunicationChannel-Publication":
                key = "getTree2";
                break;
            case "Campaign-Publication-MasterPublication":
                key = "getTree3";
                break;
            case "mi2,c1,sc1,cp1,cctwo,Pricelist/Page1":
                key = "getAssortmentsList";
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
