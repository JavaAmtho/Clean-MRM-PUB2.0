function UpdateTagsOfDimension(){

}

UpdateTagsOfDimension.update = function(dimensionId,tagsList,callBack){
    var reqBody = new Object();
    reqBody.id = dimensionId;
    reqBody.tags = tagsList;
    Router.loadPhpPostRequest("updateTagsOfDimension",true,dimensionId,reqBody,callBack);
}

