/**
 * Created with JetBrains WebStorm.
 * User: CS13
 * Date: 13/11/13
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */
var NewPageBreadCrumbWidget = function(){


    this.design = function(){
        var newPageObj = new Object();
        GraphicDataStore.setNewPageObject(newPageObj);

        $( "#dialog-form" ).dialog({
            height: 330,
            width: 470,
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
            autoOpen :true,
            close: function() {
                NewPageBreadCrumbWidget.uncheckRadio();
                $(document).unbind('createPageEvent');
            }

        });
    }
}

NewPageBreadCrumbWidget.chooseIndd = function(){
    var data = window.showModalDialog("http://192.168.135.112/CS13.0Trunk/admin/forward.php?forward=dialogs|FileInputDialog|FileInputDialog.php&CS_FILEINPUT_FILTER=indd&id=7859&hideOptionFrame=1&singleUpload=1&&singleUpload=true&hideOptionFrame=true&objectFolderId=7859&localeLang=en");
    //document.getElementById('foo').textContent = myWin;
    if(data){
        data = eval('(' + data + ')');
        var newPageObj = GraphicDataStore.getNewPageObject();
        newPageObj.fileID = data.FileID;
        GraphicDataStore.setNewPageObject(newPageObj);
    }

    //alert(JSON.stringify(GraphicDataStore.getNewPageObject()));
}

NewPageBreadCrumbWidget.createPage = function(){

    var ifValidPageName =validatePageName();
    if(ifValidPageName !== false){
        newPageObj = GraphicDataStore.getNewPageObject();
        newPageObj.name =  ifValidPageName;
        GraphicDataStore.setNewPageObject(newPageObj)
        var isTypeValid = validatePageType();
        if(isTypeValid !== false){
            newPageObj.pageType =  isTypeValid;
            GraphicDataStore.setNewPageObject(newPageObj)
            var isRendererValid = validateRenderEngineType();
            if(isRendererValid !== false){
                newPageObj.renderEngineType =  isRendererValid;
                GraphicDataStore.setNewPageObject(newPageObj)
                var valid = step2_validation();
                if(valid){
                    $(document).trigger({
                        type: "createPageEvent",
                        pageObj: GraphicDataStore.getNewPageObject()
                    });
                    $("#dialog-form").dialog( "close" );
                }
            }
        }
    }
}


NewPageBreadCrumbWidget.enableRenderingEngine = function(){
    var radioElementsPfPage = document.getElementsByName("pageType");
    var checkedIndex;
    for(var i = 0; i < radioElementsPfPage.length; i++){
        if(radioElementsPfPage[i].checked == true){
            checkedIndex = i;
            break;
        }
        else{
            //do something
        }
    }

    //This will enable the renderer engine options if page type is not manual
    var radioElementsOfRenderer = document.getElementsByName("renderType");
    if(radioElementsPfPage[checkedIndex].value != "manual"){
        for(var i = 0; i < radioElementsOfRenderer.length; i++){
            radioElementsOfRenderer[i].disabled = false;
        }
    }
    else{
        for(var i = 0; i < radioElementsOfRenderer.length; i++){
            radioElementsOfRenderer[i].disabled = true;
            radioElementsOfRenderer[i].checked = false;
        }
    }
}

NewPageBreadCrumbWidget.uncheckRadio =function(){
    $('input:text').val('');

    var choice = document.getElementsByName("pageType");
    for (i = 0; i < choice.length; i++) {
        choice[i].checked = false;
    }

    var choice2 = document.getElementsByName("renderType");
    for (i = 0; i < choice2.length; i++) {
        choice2[i].checked = false;
    }
}