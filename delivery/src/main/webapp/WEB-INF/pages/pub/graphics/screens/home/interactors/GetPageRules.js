/**
 *
 * @constructor
 */
function GetPageRules(){
//Not being used anymore since we are now using GetAllPageRules
}

/**
 *
 * @param pageID
 * @param callBack
 * @description get the page rules for the corresponding page Id
 */
GetPageRules.get = function(pageID,callBack){
    Router.loadRequest("getRules",false,callBack,pageID);
}
