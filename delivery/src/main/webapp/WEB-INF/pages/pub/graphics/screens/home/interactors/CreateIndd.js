/**
 *
 * @constructor
 */
function CreateIndd(){

}

/**
 *
 * @param ruleID
 * @param logicalPageID
 * @param publicationID
 * @param callBack
 * @description send a call to CS to create WBD and return the wbd url and mam file id
 */
CreateIndd.createIndd = function(logicalPageID,mamFileId,rendererName,callBack){
    var requestBody = new Object;
    requestBody["rendererName"] = rendererName;
    Router.loadPhpPostRequest("createIndd",true,logicalPageID +'/'+ mamFileId,requestBody,callBack)
//    Router.loadPhpGetRequest(EngineDataStore.getRestBaseUrl()+EngineDataStore.getApiMappingObject()["createWBD"] + ,true,callBack,logicalPageID)
}
