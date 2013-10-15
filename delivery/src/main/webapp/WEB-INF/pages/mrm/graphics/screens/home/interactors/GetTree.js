/**
 *
 * @constructor  GetTree
 */
function GetTree(){

}

GetTree.get = function(){
    Router.loadRequest("getTree",true,onTreeSuccess,GraphicDataStore.getCurrentSchema().name);
}

/**
 *
 * @param data
 * @description callback for geTree REST api and data is a tree that needs to be populated
 */
this.onTreeSuccess = function(data){
    $(document).trigger({
        type: "treeDataLoaded",
        treeData: data
    });
}