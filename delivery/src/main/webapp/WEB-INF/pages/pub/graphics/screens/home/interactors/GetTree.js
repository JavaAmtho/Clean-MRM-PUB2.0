/**
 *
 * @constructor
 */
function GetTree(){

}

/**
 * function to get Tree
 * @description calls REST api for getting a tree json object as per selected viewStructure
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