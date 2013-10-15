/**
 *
 * @constructor HomePresenter
 */
function HomePresenter(){

}

HomePresenter.date = new Date();
HomePresenter.units = "month";

/**
 * @description sets the different views for gantt chart like days years months etc
 */
HomePresenter.setView = function (){
    var unitName = event.currentTarget.id;
    HomePresenter.units = unitName;
    Grids[0].ChangeZoom(unitName);
}

/**
 * @description displays list view
 */
HomePresenter.viewTreeAndFields = function(){
    var show = new Array("name","startDate","endDate","manager","budgetOwner","budget");
    var hide = new Array("ganttChart");
    HomePresenter.switchGanttPersepective(show,hide);
    $("#treeGantt").removeClass("calendarButtonPressed");
}

/**
 * @description displays calendar view
 */
HomePresenter.viewTreeAndGantt = function(){
    var show = new Array("name","ganttChart");
    var hide = new Array("startDate","endDate","manager","budgetOwner","budget");
    HomePresenter.switchGanttPersepective(show,hide);
    $("#treeGantt").addClass("calendarButtonPressed");
}

/**
 *
 * @param show
 * @param hide
 * @description switches the display between list and calendar view
 */
HomePresenter.switchGanttPersepective =function(show,hide){
    Grids[0].ChangeColsVisibility(show,hide,0);
    var ganttElements = document.getElementsByClassName("GanttProperties");
    for(var i = 0; i < ganttElements.length; i++) {
        ganttElements[i].style.visibility = "visible";
    }
    HomePresenter.date = new Date(Grids[0].GetGanttDate(0));
}

/**
 * @description shows next day/month/year as per current view
 */
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

/**
 * @description shows previous day/month/year as per current view
 */
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

/**
 * @description shows current date
 */
HomePresenter.scrollToday = function(){
    HomePresenter.date=new Date();
    Grids[0].ScrollToDate(HomePresenter.date);
}

var ck_alpha = /^[A-Za-z ]+$/;
/**
 * @description validations for string inputs
 * @returns {boolean}
 */
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
/**
 * @description validations for date input
 * @returns {boolean}
 */
HomePresenter.checkDate1 = function(){
    if (!ck_date.test(event.currentTarget.value)) {
        $("#"+event.currentTarget.id).addClass( "ui-state-error") ;
        return false;
    }
    else{
        $("#"+event.currentTarget.id).removeClass("ui-state-error");
        return true;
    }
}

/**
 * @description validations for number input
 * @returns {boolean}
 */
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

/**
 * @description creates coverflow for the publications list for the selcted communication plan
 * @param publications
 */
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
        $('#coverMain').fadeIn(600);
    }
    else{
        HomePresenter.hideCoverflow();
    }

}

/**
 * @description hides the coverflow if clicked item in tree is not Communication plan or it has no publications
 */
HomePresenter.hideCoverflow = function(){
    if(HomePresenter.coverFlowExists){
        $('#coverMain').fadeOut(600);
    }
}

/**
 * @description checks if it has any publications
 * @param publications
 * @returns {boolean}
 */
HomePresenter.doesChannelHavePublications = function(publications){
    var exists = false;

    if(publications.length > 0)
      exists = true;

    return exists;
}

/**
 * @description on the fly adds the images to the div which gets converted into coverflow
 * @param details
 */
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
