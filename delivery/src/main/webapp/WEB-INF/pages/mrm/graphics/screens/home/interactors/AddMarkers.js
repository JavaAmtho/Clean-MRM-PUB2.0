function AddMarkers(){

}

AddMarkers.add = function(nameOfMarker,callBack){
     Router.loadPhpGetRequest("addMarkers",true,callBack,nameOfMarker)
}

