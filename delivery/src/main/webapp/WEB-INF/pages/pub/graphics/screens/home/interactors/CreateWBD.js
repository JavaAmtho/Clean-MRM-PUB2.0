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
 */
CreateWBD.createWBD = function(ruleID,logicalPageID,publicationID,callBack){
    Router.loadRequest("createWBD",true,callBack,ruleID + "/" + logicalPageID + "/" + publicationID )
}
