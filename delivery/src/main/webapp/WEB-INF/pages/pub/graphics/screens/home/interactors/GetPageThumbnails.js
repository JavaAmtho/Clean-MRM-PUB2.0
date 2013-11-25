/**
 *
 * @constructor
 */
function GetProductTemplatesList(){

}

/**
 *
 * @param callBack
 * @description send a call to get the master template id list
 */
GetProductTemplatesList.get = function(mamFileId,callBack){
    Router.loadRequest("getPageThumbnails",true,callBack,mamFileId);
}
