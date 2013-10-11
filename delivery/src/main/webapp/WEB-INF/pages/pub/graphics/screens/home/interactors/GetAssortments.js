/**
 *
 * @constructor
 */
function GetAssortments(){

}

/**
 *
 * @param pagePath
 * @param logicalPageID
 * @param callBack
 */
GetAssortments.get = function(pagePath,logicalPageID,callBack){
    Router.loadRequest("getAssortmentsList",false,callBack, pagePath + "/" + logicalPageID);
}
