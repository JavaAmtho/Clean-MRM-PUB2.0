function HomePresenter(){

}

HomePresenter.date = new Date();
HomePresenter.units = "month";

HomePresenter.setView = function (){
    var unitName = event.currentTarget.id;
    HomePresenter.units = unitName;
    Grids[0].ChangeZoom(unitName);
}

HomePresenter.viewTreeAndFields = function(){
    var show = new Array("name","startDate","endDate","manager","budgetOwner","budget");
    var hide = new Array("ganttChart");
    HomePresenter.switchGanttPersepective(show,hide);
    $("#treeGantt").removeClass("calendarButtonPressed");
}

HomePresenter.viewTreeAndGantt = function(){
    var show = new Array("name","ganttChart");
    var hide = new Array("startDate","endDate","manager","budgetOwner","budget");
    HomePresenter.switchGanttPersepective(show,hide);
    $("#treeGantt").addClass("calendarButtonPressed");
}

HomePresenter.switchGanttPersepective =function(show,hide){
    Grids[0].ChangeColsVisibility(show,hide,0);
    var ganttElements = document.getElementsByClassName("GanttProperties");
    for(var i = 0; i < ganttElements.length; i++) {
        ganttElements[i].style.visibility = "visible";
    }
    HomePresenter.date = new Date(Grids[0].GetGanttDate(0));
}

HomePresenter.scrollNext = function(){
    switch(HomePresenter.units){
        case "year" :
            var year = HomePresenter.date.getFullYear();
            year++;
            HomePresenter.date.setFullYear(year);
            HomePresenter.date.setDate(1);
            HomePresenter.date.setMonth(1);
            break;
        case "month" :
            var month = HomePresenter.date.getMonth();
            month++;
            HomePresenter.date.setMonth(month);
            HomePresenter.date.setDate(1);
            break;
        case "week" :
            var year = HomePresenter.date.getW();
            year++;
            HomePresenter.date.setYear(year);
            break;
        case "day" :
            var day = HomePresenter.date.getDate();
            day++;
            HomePresenter.date.setDate(day);
            break;
    }
    Grids[0].ScrollToDate(HomePresenter.date,"Left");
}

HomePresenter.scrollPrev = function(){
    switch(HomePresenter.units){

        case "year" :
            var year = HomePresenter.date.getFullYear();
            year--;
            HomePresenter.date.setFullYear(year);
            HomePresenter.date.setDate(1);
            HomePresenter.date.setMonth(1);
            break;
        case "month" :
            var month = HomePresenter.date.getMonth();
            month--;
            HomePresenter.date.setMonth(month);
            HomePresenter.date.setDate(1);
            break;
        case "week" :
            var year = HomePresenter.date.getW();
            year--;
            HomePresenter.date.setYear(year);
            break;
        case "day" :
            var day = HomePresenter.date.getDate();
            day--;
            HomePresenter.date.setDate(day);
            break;

    }
    Grids[0].ScrollToDate(HomePresenter.date,"Left");
}

HomePresenter.scrollToday = function(){
    HomePresenter.date=new Date();
    Grids[0].ScrollToDate(HomePresenter.date);
}

var ck_alpha = /^[A-Za-z ]+$/;
HomePresenter.checkAlpha1 = function(){
    if (!ck_alpha.test(event.currentTarget.value)) {
        $("#"+event.currentTarget.id).addClass( "ui-state-error") ;
        return false;
    }
    else{
        $("#"+event.currentTarget.id).removeClass("ui-state-error")   ;
        return true;
    }
}

var ck_date = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
HomePresenter.checkDate1 = function(){
    if (!ck_date.test(event.currentTarget.value)) {
        alert(123)
        // console.log(event.currentTarget.value)
        $("#"+event.currentTarget.id).addClass( "ui-state-error") ;
        return false;
    }
    else{
        $("#"+event.currentTarget.id).removeClass("ui-state-error");
        return true;
    }
}



HomePresenter.checkNum1 = function(){
    if( !$.isNumeric(event.currentTarget.value ) ){
        $("#"+event.currentTarget.id).addClass( "ui-state-error") ;
    }

    else{
        $("#"+event.currentTarget.id).removeClass("ui-state-error")   ;
        return true;
    }

}

HomePresenter.coverFlowExists = false;

HomePresenter.createFlow = function(publications){

    GraphicDataStore.setCommChannelDetails(publications);
    var details = GraphicDataStore.getCommChannelDetails();
    var hasPublication = HomePresenter.doesChannelHavePublications(details);

    if(hasPublication){
        if(!HomePresenter.coverFlowExists){
            HomePresenter.coverFlowExists = true;
        }
        $(".flow").html("");
        HomePresenter.addImagesToFlow(details)
        var scriptTag = '<script type="text/javascript" src="../../../graphics/screens/home/scripts/alienscripts/js/contentFlow/contentflow.js" load="CSFlow" ></script>';
        $("head").append(scriptTag);
        var myNewFlow = new ContentFlow('myFantasicFlow',{ reflectionHeight: 0, circularFlow: true, load:"CSFlow" } );
        //myNewFlow.init();

        /*else{
            $(".flow").html("");
            HomePresenter.addImagesToFlow(details)
            ContentFlowGlobal.Flows = [];
            $("div").remove( ".mouseoverCheckElement" );
            var myNewFlow = new ContentFlow('myFantasicFlow');
            myNewFlow.init();
        }*/
        $('#coverMain').fadeIn(600);
    }
    else{
        HomePresenter.hideCoverflow();
    }

}

HomePresenter.hideCoverflow = function(){
    if(HomePresenter.coverFlowExists){
        $('#coverMain').fadeOut(600);
    }
}

HomePresenter.doesChannelHavePublications = function(publications){
    var exists = false;

    if(publications.length > 0)
      exists = true;

    return exists;
}

HomePresenter.addImagesToFlow = function(details){
    for(var i=0; i< details.length; i++){
        var img = $(document.createElement('img'))
        img.attr('id', details[i].id);
        img.attr('src',details[i].previewImage);
        img.attr('class',"item");
        img.attr('alt',details[i].name);
        img.attr('title',details[i].name);
        img.appendTo('.flow');
    }
}
