/**
 *
 * @constructor
 */
function SearchMamAsset(){

}

/**
 *
 * @param searchKey
 * @param callBack
 */
SearchMamAsset.search = function(searchKey,callBack){
    Router.loadRequest("searchMamAssets",true,callBack,searchKey);
}

