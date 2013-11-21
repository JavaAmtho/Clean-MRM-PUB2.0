/**
 *
 * @constructor
 */
function GetAssetsTree(){

}

/**
 * function to get AssetsTree
 * @description calls REST api for getting assets tree for PIM, MAM etc
 */
GetAssetsTree.get = function(key,callBack){
    Router.loadRequest(key,true,callBack);
}

GetAssetsTree.getAssetsById = function(key,id,callBack){
    Router.loadRequest(key,true,callBack,"/"+id);
}