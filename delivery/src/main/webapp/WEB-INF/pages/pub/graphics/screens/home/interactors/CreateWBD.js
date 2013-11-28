/**
 *
 * @constructor
 */
function CreateWBD(){

}

/**
 *
 * @param ruleID
 * @param logicalPageID
 * @param publicationID
 * @param callBack
 * @description send a call to CS to create WBD and return the wbd url and mam file id
 */
CreateWBD.createWBD = function(logicalPageID,rendererName,callBack){
    var requestBody = new Object;
    requestBody["rendererName"] = rendererName;
    Router.loadPhpPostRequest("createWBD",true,logicalPageID,requestBody,callBack)
//    Router.loadPhpGetRequest(EngineDataStore.getRestBaseUrl()+EngineDataStore.getApiMappingObject()["createWBD"] + ,true,callBack,logicalPageID)
}
