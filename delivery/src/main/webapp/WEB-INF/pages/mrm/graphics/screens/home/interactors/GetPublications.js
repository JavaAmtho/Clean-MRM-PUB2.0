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
    Router.loadPhpPostRequest("getPublications",true,comChannelObj.id,reqBody,callBack)
}
