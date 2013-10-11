/**
 *
 * @constructor
 */
function GetAllPageRules(){
}

/**
 *
 * @param reqBody
 * @param callBack
 */
GetAllPageRules.get = function(reqBody,callBack){
    Router.forwardWithPost(EngineDataStore.getApiMappingObject()["getAllPageRules"],false,reqBody,callBack);
}
