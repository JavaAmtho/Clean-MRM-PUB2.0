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
 * @description calls REST api to search MAM tree and returns array of json
 */
SearchMamAsset.search = function(searchKey,callBack){
    Router.loadRequest("searchMamAssets",true,callBack,searchKey);
}

