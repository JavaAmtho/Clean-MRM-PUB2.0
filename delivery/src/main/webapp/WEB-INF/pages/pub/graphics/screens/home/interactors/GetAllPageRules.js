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
 * @description send a call to get all the saved page rules by id
 */
GetAllPageRules.get = function(reqBody,callBack){
    Router.forwardWithPost(EngineDataStore.getApiMappingObject()["getAllPageRules"],false,reqBody,callBack);
}
