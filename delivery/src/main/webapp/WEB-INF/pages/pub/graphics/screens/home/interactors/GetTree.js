/**
 *
 * @constructor
 */
function GetTree(){

}

/**
 * function to get Tree
 */
GetTree.get = function(){
    Router.loadRequest("getTree",true,onTreeSuccess,GraphicDataStore.getCurrentSchema().name);
}

/**
 *
 * @param data
 */
this.onTreeSuccess = function(data){
    $(document).trigger({
        type: "treeDataLoaded",
        treeData: data
    });
}