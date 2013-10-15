/**
 *
 * @constructor
 */
function GetMasterTemplateList(){

}

/**
 *
 * @param callBack
 * @description send a call to get the master template id list
 */
GetMasterTemplateList.get = function(callBack){
    Router.loadRequest("getMasterTemplateList",false,callBack);
}
