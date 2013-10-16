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
GetAssetsTree.get = function(){
    Router.loadRequest("getAssetsTree",true,onAssetsTreeSuccess);
}

/**
 *
 * @param data
 */
this.onAssetsTreeSuccess = function(data){
    data=eval('(' + data + ')');
    $(document).trigger({
        type: "assetsTreeDataLoaded",
        treeData: data
    });
}