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
 */
DragDimension.dragAndDropDimensions = function(prefix,name,oldPath,flag,newPath,callBack){
    Router.forward(prefix+"/name/"+name+"/path/"+oldPath+"/folder/"+flag+"/newpath/"+newPath,true,callBack);
}

