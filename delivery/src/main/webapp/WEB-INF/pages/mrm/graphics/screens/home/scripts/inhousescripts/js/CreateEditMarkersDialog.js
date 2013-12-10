function CreateEditMarkersDialog(){

}

/*Static Variables*/
CreateEditMarkersDialog.currentRow;

CreateEditMarkersDialog.markersList;

CreateEditMarkersDialog.tagsDataSource;

CreateEditMarkersDialog.create = function(G,row,col,name){
    if(!GraphicDataStore.getIfMarkersLoaded()){
       MarkersPresenter.getMarkers(function(data){
           GraphicDataStore.setMarkersCollection(data);
       });
    }
    //Always get the tagsList first and find which are provided to this dimension
    CreateEditMarkersDialog.currentRow = row;
    CreateEditMarkersDialog.createMarkersList(CreateEditMarkersDialog.currentRow);

    $( "#editMarkersdialog" ).dialog({
        height: 490,
        width: 500,
        modal: true,
        resizable: false,
        show: {
            effect: "clip",
            duration: 500
        },
        hide: {
            effect: "clip",
            duration: 500
        },

        buttons: {
            "Update": function(){
                CreateEditMarkersDialog.updateDimension();
            },
            Cancel: function(){
                closeMarkersDialog();
            }
        },
        close: function() {
            clearForm();
        },
        autoOpen :true,
        changeTitle: document.getElementById("ui-id-1").innerHTML="Edit Markers"

    });

}


CreateEditMarkersDialog.createMarkersList = function(row){
    var assignedMarkersList=[];
    if(row.markers)
        assignedMarkersList = CreateEditMarkersDialog.currentRow.markers;

    var markersColl = GraphicDataStore.getMarkersCollection();
    for(var i=0; i< markersColl.length; i++){
        markersColl[i].checked = null;
        if(assignedMarkersList.length>0){
            for(var j=0; j< assignedMarkersList.length; j++){
                if(markersColl[i].markerName == assignedMarkersList[j]){
                    markersColl[i].checked = "checked";
                }
            }
        }
    }

    CreateEditMarkersDialog.markersDataSource = new kendo.data.DataSource({
        data: markersColl
    });

    CreateEditMarkersDialog.createKendoList();
}


CreateEditMarkersDialog.createKendoList = function(){
    $("#markerList").kendoListView({
        dataSource: CreateEditMarkersDialog.markersDataSource,
        template: '<div class="tags move k-block"><input type="checkbox"  id="#:markerName#" onchange="CreateEditMarkersDialog.changeMarkerValue(this)" #:checked#>#:markerName#</div>'
    });
}

CreateEditMarkersDialog.searchMarkersInMasterList = function(){
    var searchedMarkerName = $("#markerName").val();
    var searchedColl = $.grep(GraphicDataStore.getMarkersCollection() , function (value) {
            if(value.markerName.indexOf(searchedMarkerName) !== -1)
                return true;
            return false;
        }
    );
    CreateEditMarkersDialog.markersDataSource = new kendo.data.DataSource({
        data: searchedColl
    });
    CreateEditMarkersDialog.createKendoList();
    /*MarkersPresenter.addMarkerToMasterList(markerNameEntered,CreateEditMarkersDialog.onMarkerAdded); Used for adding marker NOT IN USE*/
}

CreateEditMarkersDialog.onMarkerAdded = function(data){
   //server should give a tagObject rather than just name
    var newMarker = new Object();
    newMarker.markerName = data;
    newMarker.key = data;
    newMarker.objectKey = data;
    newMarker.checked = null;
    GraphicDataStore.addMarkerToMarkersCollection(newMarker);
    $("#markerName").val("");
    alertify.success("Marker added successfully");
    CreateEditMarkersDialog.markersDataSource = new kendo.data.DataSource({
        data: GraphicDataStore.getMarkersCollection()
    });

    CreateEditMarkersDialog.createKendoList();
}

CreateEditMarkersDialog.changeMarkerValue = function(item){
    var matchedIndex;
    for(var i=0; i< GraphicDataStore.getMarkersCollection().length; i++){
         if(GraphicDataStore.getMarkersCollection()[i].markerName === item.id){
             matchedIndex = i+1;
         }
    }
    if(matchedIndex){
        if($(item).is(':checked')){
            GraphicDataStore.getMarkersCollection()[matchedIndex-1].checked = "checked";
        }else{
            GraphicDataStore.getMarkersCollection()[matchedIndex-1].checked = null;
        }
    }
}

CreateEditMarkersDialog.updateDimension = function(){
    CreateEditMarkersDialog.markersList = [];
    for(var i=0; i< GraphicDataStore.getMarkersCollection().length; i++){
        if(GraphicDataStore.getMarkersCollection()[i].checked){
            CreateEditMarkersDialog.markersList.push(GraphicDataStore.getMarkersCollection()[i].markerName);
        }
    }
    MarkersPresenter.updateMarkersForDimension(CreateEditMarkersDialog.currentRow.id,CreateEditMarkersDialog.markersList,CreateEditMarkersDialog.onDimensionMarkersUpdateSuccess)
}

CreateEditMarkersDialog.onDimensionMarkersUpdateSuccess = function(data){
    CreateEditMarkersDialog.currentRow.markers = CreateEditMarkersDialog.markersList;
    closeMarkersDialog();
    alertify.success("Markers Edited Successfully");
}

function closeMarkersDialog(){
    $("#editMarkersdialog").dialog( "close" );
}