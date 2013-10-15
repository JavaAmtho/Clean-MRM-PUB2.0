/**
 *
 * @constructor       GetPublications
 */
function GetPublications(){

}

/**
 *
 * @param comChannelObj
 * @param callBack
 */
GetPublications.get = function(comChannelObj,callBack){

    var reqBody = new Object();
    reqBody.groupIds= comChannelObj.groupId;

    Router.forwardWithPost("/delivery/publication/get/"+comChannelObj.id,true,reqBody,function(data){
        callBack(data);
    });
}
