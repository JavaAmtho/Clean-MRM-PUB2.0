function CreateEditTagsDialog(){

}

/*Static Variables*/
CreateEditTagsDialog.currentRow;

CreateEditTagsDialog.tagsList = [];

CreateEditTagsDialog.tagsDataSource;

CreateEditTagsDialog.create = function(G,row,col,name){
    //Always get the tagsList first and find which are provided to this dimension
    CreateEditTagsDialog.currentRow = row;
    CreateEditTagsDialog.createTagsList(CreateEditTagsDialog.currentRow);

    $( "#editTagsdialog" ).dialog({
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
            "Create": function(){
                CreateEditTagsDialog.updateDimension();
            },
            Cancel: function(){
                closeTagsDialog();
            }
        },
        close: function() {
            clearForm();
        },
        autoOpen :true,
        changeTitle: document.getElementById("ui-id-1").innerHTML="Edit Tags"

    });

}

CreateEditTagsDialog.createTagsList = function(row){
    var assignedTagsList=[];
    if(row.tags)
        assignedTagsList = row.tags;

    var tagsColl = GraphicDataStore.getTagsCollection();
    for(var i=0; i< tagsColl.length; i++){
        tagsColl[i].checked = null;
        if(assignedTagsList.length>0){
            for(var j=0; j< assignedTagsList.length; j++){
                if(tagsColl[i].tagName == assignedTagsList[j]){
                    tagsColl[i].checked = "checked";
                }
            }
        }
    }

    CreateEditTagsDialog.tagsDataSource = new kendo.data.DataSource({
        data: tagsColl
    });

    CreateEditTagsDialog.createKendoList();
}


CreateEditTagsDialog.createKendoList = function(){
    $("#tagsList").kendoListView({
        dataSource: CreateEditTagsDialog.tagsDataSource,
        template: '<div class="tags move k-block"><input type="checkbox"  id="#:tagName#" onchange="CreateEditTagsDialog.changeTagValue(this)" #:checked#>#:tagName#</div>'
    });
}


CreateEditTagsDialog.addTagToMasterList = function(){
    var tagNameEntered = $("#tagName").val();
    AddTags.add("addTags",tagNameEntered,CreateEditTagsDialog.onTagAdded);
}

CreateEditTagsDialog.onTagAdded = function(data){
   //server should give a tagObject rather than just name
    var newTag = new Object();
    newTag.tagName = data;
    newTag.key = data;
    newTag.objectKey = data;
    newTag.checked = null;
    GraphicDataStore.addTagToTagsCollection(newTag);
    $("#tagName").val("");
    alertify.success("Tag added successfully");
    CreateEditTagsDialog.tagsDataSource = new kendo.data.DataSource({
        data: GraphicDataStore.getTagsCollection()
    });

    CreateEditTagsDialog.createKendoList();
}

CreateEditTagsDialog.changeTagValue = function(item){
    var matchedIndex;
    for(var i=0; i< GraphicDataStore.getTagsCollection().length; i++){
         if(GraphicDataStore.getTagsCollection()[i].tagName === item.id){
             matchedIndex = i;
         }
    }
    if(matchedIndex){
        if($(item).is(':checked')){
            GraphicDataStore.getTagsCollection()[matchedIndex].checked = "checked";
        }else{
            GraphicDataStore.getTagsCollection()[matchedIndex].checked = null;
        }
    }
}

CreateEditTagsDialog.updateDimension = function(){

    for(var i=0; i< GraphicDataStore.getTagsCollection().length; i++){
        if(GraphicDataStore.getTagsCollection()[i].checked){
            CreateEditTagsDialog.tagsList.push(GraphicDataStore.getTagsCollection()[i].tagName);
        }
    }
    UpdateTagsOfDimension.update(CreateEditTagsDialog.currentRow.id,CreateEditTagsDialog.tagsList,CreateEditTagsDialog.onDimensionTagsUpdateSuccess)
}

CreateEditTagsDialog.onDimensionTagsUpdateSuccess = function(data){
    CreateEditTagsDialog.currentRow.tags = CreateEditTagsDialog.tagsList;
}

function closeTagsDialog(){
    $("#editTagsdialog").dialog( "close" );
}