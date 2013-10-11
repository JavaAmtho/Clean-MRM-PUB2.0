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
 */
SavePageRules.save = function(key,rulesObj,callBack){
    var reqBody = rulesObj;
    var url = EngineDataStore.getApiMappingObject()[key];
    Router.forwardWithPost(url,true,reqBody,function(data){
        callBack(data);
    });
}
