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
    var input = new Object();
    input.id=reqBody.id;
    input.title=reqBody.title;
    Router.forwardWithPost(prefix+dimensionId,true,input,callBack);
}
