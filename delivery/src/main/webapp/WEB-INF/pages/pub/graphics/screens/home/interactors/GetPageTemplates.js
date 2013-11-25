/**
 *
 * @constructor
 */
function GetPageTemplates(){

}

GetPageTemplates.getAll = function(callBack){
    Router.loadPhpGetRequest("getPageTemplates",false,callBack);
}
