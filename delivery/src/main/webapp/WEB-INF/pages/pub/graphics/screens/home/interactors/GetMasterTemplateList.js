/**
 *
 * @constructor
 */
function GetMasterTemplateList(){

}

/**
 *
 * @param callBack
 */
GetMasterTemplateList.get = function(callBack){
    Router.loadRequest("getMasterTemplateList",false,callBack);
}
