/**
 *
 * @constructor
 */
function UpdateAssortment(){

}

/**
 *
 * @param assortmentObj
 * @param reqBody
 * @param callBack
 * @description calls REST api to update the assortment currently changed/opened
 */
UpdateAssortment.update = function(assortmentObj,reqBody,callBack){
    Router.forwardWithPost("/delivery/assortment/update"+"/"+assortmentObj.title+"/"+assortmentObj.path,true,reqBody,function(data){
        callBack(data);
    });
}

/**
 *
 * @param data
 */
this.onUpdateSuccess = function(data){
    /*$(document).trigger({
        type: "assetsTreeDataLoaded",
        treeData: data
    });*/
}