/**
 * Created with JetBrains WebStorm.
 * User: CS13
 * Date: 13/11/13
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */
var editPage = false;

var NewPageBreadCrumbWidget = function(){


    this.design = function(data){
        var newPageObj = new Object();
        GraphicDataStore.setNewPageObject(newPageObj);

        if(data){
            NewPageBreadCrumbWidget.preInsertFormDetails(data);
            editPage = true;
        }


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
                $(document).unbind('editPageEvent');
                $(document).unbind('createPageEvent');
            }

        });
    }
}

NewPageBreadCrumbWidget.chooseIndd = function(){
    var data = window.showModalDialog(EngineDataStore.getChooseMasterTempUrl());
    //document.getElementById('foo').textContent = myWin;
    if(data){
        data = eval('(' + data + ')');
        var newPageObj = GraphicDataStore.getNewPageObject();
        newPageObj.fileID = data.FileID;
        GraphicDataStore.setNewPageObject(newPageObj);
    }

    //alert(JSON.stringify(GraphicDataStore.getNewPageObject()));
}

NewPageBreadCrumbWidget.preInsertFormDetails = function(data){
    var radioElementsOfPage = document.getElementsByName("pageType");
    for(var i = 0; i < radioElementsOfPage.length; i++){
        if(radioElementsOfPage[i].value == data.pageType){
            radioElementsOfPage[i].checked = true;
            break;
        }
    }

    var radioElementsOfRenderer = document.getElementsByName("renderType");
    for(var i = 0; i < radioElementsOfRenderer.length; i++){
        if(radioElementsOfRenderer[i].value == data.renderEngineType){
            radioElementsOfRenderer[i].checked = true;
            break;
        }
    }

    $('input:text').val(data.title);

    NewPageBreadCrumbWidget.enableRenderingEngine();
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

                    if(editPage){
                       $(document).trigger({
                            type: "editPageEvent",
                            pageObj: GraphicDataStore.getNewPageObject()
                       });
                    }else{
                        $(document).trigger({
                            type: "createPageEvent",
                            pageObj: GraphicDataStore.getNewPageObject()
                        });
                    }

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

    if(checkedIndex){
        //This will enable the renderer engine options if page type is not manual
        var radioElementsOfRenderer = document.getElementsByName("renderType");
        if(radioElementsPfPage[checkedIndex].value == "creative"){
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