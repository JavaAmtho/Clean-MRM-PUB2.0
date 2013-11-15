/**
 * Created with JetBrains WebStorm.
 * User: CS13
 * Date: 13/11/13
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */
var NewPageBreadCrumbWidget = function(){

    this.design = function(){
        $('#slider').rhinoslider({
            /*callBackInit: function(){
              alert(123)
            },*/
            controlsPlayPause: false,
            showControls: 'always',
            showBullets: 'always',
            controlsMousewheel: false,
            prevText: 'Back',
            nextText:'Proceed',
            slidePrevDirection: 'toRight',
            slideNextDirection: 'toLeft'
        });


        $(".rhino-prev").hide();
        $('.rhino-next').after('<a class="form-submit" href="javascript:void(0);" >Proceed</a>');
        $(".rhino-next").hide();


        var info = ["Enter Page Name","Select Page Type"];
        var images = ["personal-details-icon.png","account-details.png"];
        $('.rhino-bullet').each(function(index){
            $(this).html('<p style="margin: 0pt; font-size: 13px; font-weight: bold;"><img src="../img/'+
                images[index]+'"></p><p class="bullet-desc">'+info[index]+'</p></a>');
        });

        $('.form-submit').live("click",function(){
            $('.form-error').html("");
            var current_tab = $('#slider').find('.rhino-active').attr("id");

            var newPageObj = new Object();
            switch(current_tab){
                case 'rhino-item0':
                    var ifValidPageName =validatePageName();
                    if(ifValidPageName !== false){
                        newPageObj.name =  ifValidPageName;
                        GraphicDataStore.setNewPageObject(newPageObj)
                    }
                    var isTypeValid = validatePageType();
                    if(isTypeValid !== false){
                        newPageObj.pageType =  isTypeValid;
                        GraphicDataStore.setNewPageObject(newPageObj)
                    }
                    var isRendererValid = validateRenderEngineType();
                    if(isRendererValid !== false){
                        newPageObj.renderEngineType =  isRendererValid;
                        GraphicDataStore.setNewPageObject(newPageObj)
                    }

                    break;
                case 'rhino-item1':
                    valid = step2_validation();
                    if(valid){
                        $(document).trigger({
                            type: "createPageEvent",
                            pageObj: GraphicDataStore.getNewPageObject()
                        });
                        $("#dialog-form").dialog( "close" );
                    }
                    break;
            }
        });

        $( "#dialog-form" ).dialog({
            height: 450,
            width: 750,
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



            autoOpen :true

        });
    }
}

NewPageBreadCrumbWidget.chooseIndd = function(){
    var data = window.showModalDialog("http://192.168.135.112/CS13.0Trunk/admin/forward.php?forward=dialogs|FileInputDialog|FileInputDialog.php&CS_FILEINPUT_FILTER=indd,pdf&id=7859&hideOptionFrame=1&singleUpload=1&&singleUpload=true&hideOptionFrame=true&objectFolderId=7859&localeLang=en");
    //document.getElementById('foo').textContent = myWin;
    if(data){
        data = eval('(' + data + ')');
        var obj = GraphicDataStore.getNewPageObject();
        obj.mamFileID = data.FileID;
    }
    //alert(JSON.stringify(GraphicDataStore.getNewPageObject()));
}
