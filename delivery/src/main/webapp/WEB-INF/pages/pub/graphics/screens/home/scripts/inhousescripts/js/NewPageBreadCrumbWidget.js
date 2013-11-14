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


        var info = ["Enter Page Name","Select Page Type","Select Indd","Select Rendering Engine"];
        var images = ["personal-details-icon.png","account-details.png","contact-details.png","contact-details.png"];
        $('.rhino-bullet').each(function(index){
            $(this).html('<p style="margin: 0pt; font-size: 13px; font-weight: bold;"><img src="../img/'+
                images[index]+'"></p><p class="bullet-desc">'+info[index]+'</p></a>');
        });

        $('.form-submit').live("click",function(){
            $('.form-error').html("");
            var current_tab = $('#slider').find('.rhino-active').attr("id");
            switch(current_tab){
                case 'rhino-item0':
                    validatePageName();
                    break;
                case 'rhino-item1':
                    validatePageType();
                    break;
                case 'rhino-item2':
                    step3_validation();
                    break;
                case 'rhino-item3':
                    validateRenderEngineType();
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
