/**
 *
 * @constructor
 */
function CopyAssortment(){

}

/**
 *
 * @param prefix
 * @param name
 * @param newPath
 * @param reqBody
 * @param callBack
 * @description calls REST api for drag and drop of assortment object
 */
CopyAssortment.dragAndDropAssortment = function(prefix,name,newPath,reqBody,callBack){
    Router.forwardWithPost(prefix+name+"/"+newPath,true,reqBody,callBack);
}

