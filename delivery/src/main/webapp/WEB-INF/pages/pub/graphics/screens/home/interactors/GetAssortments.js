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
 * @description calls REST api to get all assortments created under the page
 */
GetAssortments.get = function(pagePath,logicalPageID,callBack){
    Router.loadRequest("getAssortmentsList",false,callBack, pagePath + "/" + logicalPageID);
}
