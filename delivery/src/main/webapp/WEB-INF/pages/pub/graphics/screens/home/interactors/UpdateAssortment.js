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
    Router.forwardWithPost(EngineDataStore.getRestBaseUrl()+"/assortment/update"+"/"+assortmentObj.id+"/"+assortmentObj.path,true,reqBody,function(data){
        callBack(data);
    });
}
