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
CreateWBD.createWBD = function(ruleID,logicalPageID,publicationID,callBack){
    Router.loadRequest("createWBD",true,callBack,ruleID + "/" + logicalPageID + "/" + publicationID )
}
