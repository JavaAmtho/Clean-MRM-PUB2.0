function GetMarkers(){

}

GetMarkers.getAllMarkers = function(callBack){
    var data = {
        "Category 1": [
            {
                "markerName": "Category1Marker1"
            },
            {
                "markerName": "Category1Marker2"
            }
        ],
        "Category 2": [
            {
                "markerName": "Category2Marker1"
            },
            {
                "markerName": "Category2Marker2"
            }
        ]
    }
    callBack(data);
     //Router.loadPhpGetRequest("getAllMarkers",false,callBack)
}

