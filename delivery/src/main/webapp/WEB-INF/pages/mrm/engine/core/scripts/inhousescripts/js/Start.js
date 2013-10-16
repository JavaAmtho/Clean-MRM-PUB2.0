/**
 * document.ready function
 * @description Entry point of the application
 */
$(document).ready(function() {
     loadInitialConfigurations();

});

/**
 * loadInitialConfigurations
 * @description Loads InitialConfiguration.json file which has baseURl and other important configuration details
 */
function loadInitialConfigurations(){
    Router.forward("../../../graphics/tacks/InitialConfiguration.json",true,function(json){
        parseInitialConfiguration(json);
        getPublicationDetailsObject();
    });
}

/**
 * @param data
 * @description Parse the InitialConfiguration.json file and stores it to the cloud
 */
function parseInitialConfiguration(data){
    EngineDataStore.setBaseURL(data.baseUrl);
    EngineDataStore.setMrmUrl(data.MRMUrl);
    EngineDataStore.setPubUrl(data.PubUrl);
}

/**
 * getPublicationDetails
 * @description Loads PublicationDetails.json file which has information about which image to show for Publication in coverflow
 */
function getPublicationDetailsObject(){
    Router.forward(EngineDataStore.getBaseURL()+"graphics/tacks/PublicationDetails.json",true,function(json){
        parsePublicationDetailsObject(json);
    });
}

/**
 * @param json
 * @description Stores PublicationDetails.json file information to the cloud
 */
function parsePublicationDetailsObject(json){
    EngineDataStore.setPublicationDetailsArray(json);
    getScreenMappingObject();
}


/**
 * getScreenMappingObject
 * @description Loads ScreenMapping.json file which has information about which screen needs to be loaded as per the requested URL
 */
function getScreenMappingObject(){
    Router.forward(EngineDataStore.getBaseURL()+"graphics/tacks/ScreenMapping.json",true,function(json){
        parseScreenMappingObject(json);
    });
}

/**
 *
 * @param json
 * @description Stores ScreenMapping.json file information to the cloud
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
 * @description Loads RequestMapping.json file which has information about which REST API needs to be called as per the requested URL
 */
function getApiMappingObject(){
    Router.forward(EngineDataStore.getBaseURL()+"graphics/tacks/RequestMapping.json",true,function(json){
        parseApiMappingObject(json);
    });
}

/**
 * @param json
 * @description Stores RequestMapping.json file information to the cloud
 */
function parseApiMappingObject(json){
    EngineDataStore.setApiMappingObject(json);
}

