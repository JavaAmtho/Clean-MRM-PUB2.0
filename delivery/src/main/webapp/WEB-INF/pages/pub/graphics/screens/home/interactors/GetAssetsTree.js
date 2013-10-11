/**
 *
 * @constructor
 */
function GetAssetsTree(){

}

/**
 * function to get AssetsTree
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