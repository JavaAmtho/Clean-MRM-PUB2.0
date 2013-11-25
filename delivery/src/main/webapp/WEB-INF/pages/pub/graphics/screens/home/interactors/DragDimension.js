/**
 *
 * @constructor
 */
function DragDimension(){

}

/**
 *
 * @param prefix
 * @param name
 * @param oldPath
 * @param flag
 * @param newPath
 * @param callBack
 * @description calls REST api for drag and drop of dimension object
 */
DragDimension.dragAndDropDimensions = function(prefix,name,oldPath,flag,newPath,callBack){
    Router.forward(EngineDataStore.getRestBaseUrl()+prefix+"/name/"+name+"/path/"+oldPath+"/folder/"+flag+"/newpath/"+newPath,true,callBack);
}

