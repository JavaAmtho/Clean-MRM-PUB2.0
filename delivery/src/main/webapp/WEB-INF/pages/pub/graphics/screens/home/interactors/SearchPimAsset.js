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
 * @description calls REST api to search PIM tree and returns array of json
 */
SearchPimAsset.search = function(searchKey,callBack){
    Router.loadPhpGetRequest("searchPimAssets",true,callBack,searchKey);
}

