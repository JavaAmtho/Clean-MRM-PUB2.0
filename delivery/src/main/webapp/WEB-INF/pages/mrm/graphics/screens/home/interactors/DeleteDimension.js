/**
 *
 * @constructor    DeleteDimension
 */
function DeleteDimension(){

}

/**
 *
 * @param prefix
 * @param type
 * @param input
 * @param callback
 */
DeleteDimension.deleteDim = function(prefix,type,input,callback){
    Router.forwardWithPost(EngineDataStore.getRestBaseUrl()+prefix+type+"/"+input.id,true,input,callback);
}

