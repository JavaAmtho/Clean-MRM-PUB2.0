/**
 *
 * @constructor       UpdateDimension
 */
function UpdateDimension(){

}

/**
 *
 * @param prefix
 * @param row
 * @param callBack
 */
UpdateDimension.updateDim = function(prefix,dimensionId,reqBody,callBack){
    //prefix = "dimension/update/";
    var input = new Object();
    input.id=reqBody.id;
    input.title=reqBody.title;
    input.type=reqBody.type;
    Router.forwardWithPost(EngineDataStore.getRestBaseUrl()+prefix+dimensionId,true,input,callBack);
}

