var MarkersPresenter = function(){

}

MarkersPresenter.addMarkerToMasterList = function(nameOfMarker,callBack){
    AddMarkers.add(nameOfMarker,callBack);
}

MarkersPresenter.updateMarkersForDimension = function(dimensionId,markersList,callBack){
    UpdateMarkersOfDimension.update(dimensionId,markersList,callBack);
}

MarkersPresenter.getMarkers = function(callBack){
    GetMarkers.getAllMarkers(callBack);
}