/**
 *
 * @constructor
 */
var EngineDataStore = function(){
    var screenMappingObject;
    var apiMappingObject;
    var baseURL;
    var mrmUrl;
    var pubUrl;
    var publicationDetailsArray;
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
 * @returns base-url
 */
EngineDataStore.getBaseURL = function(){
    return this.baseURL;
}

/**
 *
 * @param url
 */
EngineDataStore.setMrmUrl = function(url){
    this.mrmUrl = url;
}

/**
 *
 * @returns MRM-url
 */
EngineDataStore.getMrmUrl = function(){
    return this.mrmUrl;
}

/**
 *
 * @param url
 */
EngineDataStore.setPubUrl = function(url){
    this.pubUrl = url;
}

/**
 *
 * @returns PUB-url
 */
EngineDataStore.getPubUrl = function(){
    return this.pubUrl;
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
