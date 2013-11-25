/**
 *
 * @constructor
 */
function SavePageRules(){

}


/**
 *
 * @param key
 * @param rulesObj
 * @param callBack
 * @description calls REST api to save all the page rules wrt the logical page
 */
SavePageRules.save = function(rulesObj,callBack){
    var reqBody = rulesObj;
    var url = EngineDataStore.getApiMappingObject()["saveRules"];
    Router.forwardWithPost(url,true,reqBody,function(data){
        callBack(data);
    });
}
