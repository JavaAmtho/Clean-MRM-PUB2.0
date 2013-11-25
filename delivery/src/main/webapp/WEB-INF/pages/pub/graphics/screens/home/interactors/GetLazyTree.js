/**
 *
 * @constructor
 */
function GetLazyTree(){

}

/**
 * function to get Tree
 * @description calls REST api for getting a tree json object as per selected viewStructure
 */
GetLazyTree.get = function(requestBody,callback){
    Router.loadPhpPostRequest("getLazyTree",false,null,requestBody,callback? callback : onTreeSuccess);
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