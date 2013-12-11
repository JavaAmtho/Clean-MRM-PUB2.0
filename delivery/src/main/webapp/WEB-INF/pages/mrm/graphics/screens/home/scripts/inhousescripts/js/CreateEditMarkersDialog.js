function CreateEditMarkersDialog(){

}

/*Static Variables*/
CreateEditMarkersDialog.currentRow;

CreateEditMarkersDialog.markersList;

CreateEditMarkersDialog.tagsDataSource;

CreateEditMarkersDialog.create = function(G,row,col,name){
    if(!GraphicDataStore.getIfMarkersLoaded()){
       MarkersPresenter.getMarkers(function(data){
           //data = eval('(' + data + ')');
           /*$.each(data, function (key, item) {
               alert(key)
               alert(JSON.stringify(item))
           });*/
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
    $("#markerList").empty();
    if(row.markers)
        assignedMarkersList = CreateEditMarkersDialog.currentRow.markers;

    var markersColl = GraphicDataStore.getMarkersCollection();
    var tempId=1;
    $.each(markersColl, function (key, item) {

            //Need to create labels as many as categories exists
            var categoryName = document.createElement("Label");
            categoryName.setAttribute("for", key);
            categoryName.innerHTML = key;
            document.getElementById('markerList').appendChild(categoryName);

            //Need to create divs as many as categories exists
            var categoryDiv = document.createElement('div');
            //tempId = key.replace(/^\s+|\s+$/g,'')
            categoryDiv.id = tempId+"categoryDiv";
            categoryDiv.className = 'categoryList';
            document.getElementById('markerList').appendChild(categoryDiv);

            //Need to create dataprovider for all category lists
            var categoryColl = [];
            var categoryColl = item;
            for(var i=0; i< categoryColl.length; i++){
                categoryColl[i].checked = null;
                if(assignedMarkersList.length>0){
                    for(var j=0; j< assignedMarkersList.length; j++){
                        if(categoryColl[i].markerName == assignedMarkersList[j]){
                            categoryColl[i].checked = "checked";
                        }
                    }
                }
            }


            //Need to create dataSource for all category kendo lists
            CreateEditMarkersDialog.markersDataSource = new kendo.data.DataSource({
                data: categoryColl
            });

            CreateEditMarkersDialog.createKendoList(tempId+"categoryDiv");
            tempId++;

    });

}


CreateEditMarkersDialog.createKendoList = function(id){
    $("#"+id).kendoListView({
        dataSource: CreateEditMarkersDialog.markersDataSource,
        template: '<div class="tags move k-block"><input type="checkbox"  id="#:markerName#" onchange="CreateEditMarkersDialog.changeMarkerValue(this)" #:checked#>#:markerName#</div>'
    });
}

CreateEditMarkersDialog.searchMarkersInMasterList = function(){
    var searchedMarkerName = $("#markerName").val();
    var tempId=1;
    $.each(GraphicDataStore.getMarkersCollection(), function (key, item) {
        var searchedColl = $.grep(item , function (value) {
                if(value.markerName.indexOf(searchedMarkerName) !== -1)
                    return true;
                return false;
            }
        );
        CreateEditMarkersDialog.markersDataSource = new kendo.data.DataSource({
            data: searchedColl
        });
        CreateEditMarkersDialog.createKendoList(tempId+"categoryDiv");
        tempId++;
    });

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

CreateEditMarkersDialog.changeMarkerValue = function(itemClicked){
    var matchedIndex;
    var matchedCategory;
    $.each(GraphicDataStore.getMarkersCollection(), function (key, item) {
        for(var i=0; i< item.length; i++){
             if(item[i].markerName === itemClicked.id){
                 matchedIndex = i+1;
                 matchedCategory = key;
             }
        }
    });

    if(matchedIndex){
        if($(itemClicked).is(':checked')){
            GraphicDataStore.getMarkersCollection()[matchedCategory][matchedIndex-1].checked = "checked";
        }else{
            GraphicDataStore.getMarkersCollection()[matchedCategory][matchedIndex-1].checked = null;
        }
    }
}

CreateEditMarkersDialog.updateDimension = function(){
    CreateEditMarkersDialog.markersList = [];

    $.each(GraphicDataStore.getMarkersCollection(), function (key, item) {
        for(var i=0; i< item.length; i++){
            if(item[i].checked){
                CreateEditMarkersDialog.markersList.push(item[i].markerName);
            }
        }
    });

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