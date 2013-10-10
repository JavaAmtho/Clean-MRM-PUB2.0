var pubIdToOpen;
$(document).ready(function() {

   /* $("body").queryLoader2({
        barColor: "#6e6d73",
        backgroundColor: "#343434",
        percentage: true,
        barHeight: 1,
        completeAnimation: "grow"
    });*/

    pubIdToOpen = getParameterByName("pubId");
    EngineDataStore.setBaseURL("../../../");
    getPublicationDetailsObject();
});

function getPublicationDetailsObject(){
    Router.forward(EngineDataStore.getBaseURL()+"graphics/tacks/PublicationDetails.json",true,function(json){
        parsePublicationDetailsObject(json);
    });
}

function parsePublicationDetailsObject(json){
    EngineDataStore.setPublicationDetailsArray(json);
    getScreenMappingObject();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getScreenMappingObject(){
    Router.forward(EngineDataStore.getBaseURL()+"graphics/tacks/MocksScreenMappingLocal.json",true,function(json){
        parseScreenMappingObject(json);
    });
}
var arr = [];

function parseScreenMappingObject(json){
    //json=eval('(' + json + ')');
    EngineDataStore.setScreenMappingObject(json);
    $.each(json, function (key, item) {
        if(item.loadOnStartup == "true"){
            var obj = new Object();
            obj.key = key;
            obj.item = item;
            arr.push(obj);
            //TemplateLoader.loadTemplate(key,'',item.containerId);
        }
    });
    TemplateLoader.loadOnStartUp();

    getApiMappingObject();
}

function getApiMappingObject(){
    Router.forward(EngineDataStore.getBaseURL()+"graphics/tacks/MocksRequestMappingLocal.json",true,function(json){
        parseApiMappingObject(json);
    });
}

function parseApiMappingObject(json){
    //json=eval('(' + json + ')');
    EngineDataStore.setApiMappingObject(json);
    Router.loadRequest("getMasterTemplateList",false,function(data){
        EngineDataStore.setMasterTemplateList(data);
    });
}

