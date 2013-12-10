function CreateEditTagsDialog(){

}

CreateEditTagsDialog.create = function(G,row,col,name){
    //Always get the tagsList first and find which are provided to this dimension
    CreateEditTagsDialog.createTagsLIst(row);

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

            },
            Cancel: function(){
                closeTagsDialog();
            }
        },
        close: function() {
            clearForm();
        },
        autoOpen :true
        //changeTitle: document.getElementById("ui-id-1").innerHTML="Create New " + name

    });

}

CreateEditTagsDialog.tagsDataSource;

CreateEditTagsDialog.createTagsLIst = function(row){
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

    $("#tagsList").kendoListView({
        dataSource: CreateEditTagsDialog.tagsDataSource,
        template: '<div class="tags move k-block"><input type="checkbox" #:checked#>#:tagName#</div>'
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
    CreateEditTagsDialog.tagsDataSource = new kendo.data.DataSource({
        data: GraphicDataStore.getTagsCollection()
    });

    $("#tagsList").kendoListView({
        dataSource: CreateEditTagsDialog.tagsDataSource,
        template: '<div class="tags move k-block"><input type="checkbox" #:checked#>#:tagName#</div>'
    });
}

function closeTagsDialog(){
    $("#editTagsdialog").dialog( "close" );
}