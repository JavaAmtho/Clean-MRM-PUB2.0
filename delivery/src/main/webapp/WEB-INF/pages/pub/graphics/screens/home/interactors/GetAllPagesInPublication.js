/**
 *
 * @constructor
 */
function GetAllPagesInPublication(){
}

/**
 *
 * @param publicationID
 * @param callBack
 * @description get all the pages under the publication for the show all pages button
 */
GetAllPagesInPublication.get = function(publicationID,callBack){
    Router.loadRequest("getAllPagesUnderPublication",false,callBack,publicationID);
}
