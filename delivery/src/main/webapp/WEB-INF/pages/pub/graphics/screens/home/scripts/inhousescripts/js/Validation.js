var validatePageName = function(){
    var err = 0;
    var name = $('#pageName').val();
    name = name.replace(/^\s+|\s+$/g,'')
    if(name == ''){
        $('#pageNameText').html("Page Name Can Not Be Empty");
        err++;
    }
    if(err == 0){
        return name;
    }else{
        return false;
    }
};

var validatePageType = function(){
    var err = 0;

    /*Uncomment this in order to add validations*/
    var group = document.createPageForm.pageType;
    for (var i=0; i<group.length; i++) {
        if (group[i].checked)
            break;
    }
    /*if (i==group.length){
        err++
        $('#pageTypeErrorText').html("Please Choose The Type Of Page");
    }*/

    if(err == 0){
        if(i==group.length)
            return "";
        return group[i].value;
    }else{
        $(".rhino-active-bullet").removeClass("step-success").addClass("step-error");
        return false;
    }

};

var validateRenderEngineType = function(){
    var err = 0;

    /*Uncomment this in order to add validations*/
    var group = document.createPageForm.renderType;
    for (var i=0; i<group.length; i++) {
        if (group[i].checked)
            break;
    }
    /*if (i==group.length){
        err++
        $('#engineTypeErrorText').html("Please Choose The Type Of Rendering Engine");
    }*/

    if(err == 0){
        if(i==group.length)
            return "";
        return group[i].value;
    }else{
        $(".rhino-active-bullet").removeClass("step-success").addClass("step-error");
        return false;
    }

};



var step2_validation = function(){
    var err = 0;

    if(err == 0){
        return true;
    }else{
        return false;
    }

};
