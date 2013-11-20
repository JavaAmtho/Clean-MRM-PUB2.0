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
    var chooseMasterTempUrl;
}

/**
 *
 * @param url
 */
EngineDataStore.setRestBaseUrl = function(url){
    this.restBaseUrl = url;
}

/**
 *
 * @returns rest base-url
 */
EngineDataStore.getRestBaseUrl = function(){
    return this.restBaseUrl;
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
 * @param list
 */
EngineDataStore.setChooseMasterTempUrl = function(url){
    this.chooseMasterTempUrl = url;
}

/**
 *
 * @returns masterTemplateList
 */
EngineDataStore.getChooseMasterTempUrl = function(){
    return this.chooseMasterTempUrl;
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
