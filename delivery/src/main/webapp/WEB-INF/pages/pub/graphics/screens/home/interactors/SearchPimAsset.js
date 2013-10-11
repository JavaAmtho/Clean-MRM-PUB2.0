/**
 *
 * @constructor
 */
function SearchPimAsset(){

}

/**
 *
 * @param searchKey
 * @param callBack
 */
SearchPimAsset.search = function(searchKey,callBack){
    Router.loadRequest("searchPimAssets",true,callBack,searchKey);
}

