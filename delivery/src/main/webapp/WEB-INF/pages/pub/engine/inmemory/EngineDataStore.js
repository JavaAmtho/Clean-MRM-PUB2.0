/**
 *
 * @constructor
 */
var EngineDataStore = function(){
    var screenMappingObject;
    var apiMappingObject;
    var baseURL;
    var publicationDetailsArray;
    var masterTemplateList;
}

/**
 *
 * @param list
 */
EngineDataStore.setMasterTemplateList = function(list){
    this.masterTemplateList = list;
}

/**
 *
 * @returns masterTemplateList
 */
EngineDataStore.getMasterTemplateList = function(){
    return this.masterTemplateList;
}

/**
 *
 * @param url
 */
EngineDataStore.setBaseURL = function(url){
    this.baseURL = url;
}

/**
 *
 * @returns baseURL
 */
EngineDataStore.getBaseURL = function(){
    return this.baseURL;
}

/**
 *
 * @param obj
 */
EngineDataStore.setScreenMappingObject = function(obj){
    this.screenMappingObject = obj;
}

/**
 *
 * @returns screenMappingObject
 */
EngineDataStore.getScreenMappingObject = function(){
    return this.screenMappingObject;
}

/**
 *
 * @param obj
 */
EngineDataStore.setApiMappingObject = function(obj){
    this.apiMappingObject = obj;
}

/**
 *
 * @returns apiMappingObject
 */
EngineDataStore.getApiMappingObject = function(){
    return this.apiMappingObject;
}

/**
 *
 * @param obj
 */
EngineDataStore.setPublicationDetailsArray = function(obj){
    this.publicationDetailsArray = obj;
}

/**
 *
 * @returns publicationDetailsArray object
 */
EngineDataStore.getPublicationDetailsArray = function(){
    return this.publicationDetailsArray;
}
