function UpdateMarkersOfDimension(){

}

UpdateMarkersOfDimension.update = function(dimensionId,markersList,callBack){
    var reqBody = new Object();
    reqBody.id = dimensionId;
    reqBody.markers = markersList;
    Router.loadPhpPostRequest("updateMarkersOfDimension",true,dimensionId,reqBody,callBack);
}

