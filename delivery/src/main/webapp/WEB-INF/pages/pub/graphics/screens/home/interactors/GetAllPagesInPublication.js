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
 */
GetAllPagesInPublication.get = function(publicationID,callBack){
    Router.loadRequest("getAllPagesUnderPublication",false,callBack,publicationID);
}
