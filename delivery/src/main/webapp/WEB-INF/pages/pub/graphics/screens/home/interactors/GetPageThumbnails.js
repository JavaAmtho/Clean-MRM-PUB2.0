/**
 *
 * @constructor
 */
function GetPageThumbnails(){

}

/**
 *
 * @param callBack
 * @description send a call to get the master template id list
 */
GetPageThumbnails.get = function(mamFileId,callBack){
    Router.loadRequest("getPageThumbnails",false,callBack,mamFileId);
}
