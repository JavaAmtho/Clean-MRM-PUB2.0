/**
 * document.ready function
 *
 */
$(document).ready(function() {
     loadInitialConfigurations();

});

/**
 * loadInitialConfigurations
 */
function loadInitialConfigurations(){
    Router.forward("../../../graphics/tacks/InitialConfiguration.json",true,function(json){
        parseInitialConfiguration(json);
        getPublicationDetailsObject();
    });
}

/**
 *
 * @param data
 */
function parseInitialConfiguration(data){
    EngineDataStore.setBaseURL(data.baseUrl);
    EngineDataStore.setMrmUrl(data.MRMUrl);
    EngineDataStore.setPubUrl(data.PubUrl);
}

/**
 * getPublicationDetails
 */
function getPublicationDetailsObject(){
    Router.forward(EngineDataStore.getBaseURL()+"graphics/tacks/PublicationDetails.json",true,function(json){
        parsePublicationDetailsObject(json);
    });
}

/**
 *
 * @param json
 */
function parsePublicationDetailsObject(json){
    EngineDataStore.setPublicationDetailsArray(json);
    getScreenMappingObject();
}


/**
 * getApiMappingObject
 */
function getScreenMappingObject(){
    Router.forward(EngineDataStore.getBaseURL()+"graphics/tacks/ScreenMapping.json",true,function(json){
        parseScreenMappingObject(json);
    });
}

/**
 *
 * @param json
 */
function parseScreenMappingObject(json){
    EngineDataStore.setScreenMappingObject(json);
    $.each(json, function (key, item) {
        if(item.loadOnStartup == "true"){
            TemplateLoader.loadTemplate(key,'',item.containerId);
        }
    });
    getApiMappingObject();
}

/**
 * getApiMappingObject
 */
function getApiMappingObject(){
    Router.forward(EngineDataStore.getBaseURL()+"graphics/tacks/RequestMapping.json",true,function(json){
        parseApiMappingObject(json);
    });
}

/**
 *
 * @param json
 */
function parseApiMappingObject(json){
    EngineDataStore.setApiMappingObject(json);
}

