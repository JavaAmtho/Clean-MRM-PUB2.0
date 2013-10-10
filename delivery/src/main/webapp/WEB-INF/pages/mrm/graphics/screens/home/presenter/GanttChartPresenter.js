var myData;

/**
 *
 * @constructor
 */
var GanttChartPresenter = function(){

    $("#treeGantt").addClass("calendarButtonPressed");

    var ganttElements = document.getElementsByClassName("GanttProperties");
    for(var i = 0; i < ganttElements.length; i++) {
        ganttElements[i].style.visibility = "visible";
    }

    //console.log(ganttElements);

    /**
     *
     * @param id
     */
    this.design = function(id){
        var treeData;

        $(document).bind("viewStructureLoaded", function onSchemaLoadedHandler(e){
			//This is to create folder as per first element of the current schema
			treeData = {};
            treeData = [{
                "id" : "-1" ,"type": 'root',
                "title" : GraphicDataStore.getFirstDimension(),
                "name" : GraphicDataStore.getFirstDimension(),
                "isFolder" : "true",
                "Items":[]
            }];
            myData = {
                Body: [treeData]
            };



            $(document).bind("treeDataLoaded", function onSchemaLoadedHandler(e){

                if(e.treeData != "error"){
                  treeData[0].Items = e.treeData;
                }
                myData = {
                    Body: [treeData]
                };

                var gantChart = ElementFactory.getGanttChart();
                gantChart.createGanttChart(id);
                $(document).unbind("treeDataLoaded");
            });
            GanttChartPresenter.getTree();

        });

        tips = $( ".validateTips" );
        $( "#dialog-form" ).dialog({
            autoOpen: false

        });

    }

}

/**
 *
 * @returns new GanttChartPresenter
 */
GanttChartPresenter.getInstance = function(){
    return new GanttChartPresenter();
}

/**
 *
 */
GanttChartPresenter.getTree = function(){
    GetTree.get();
}

/**
 *
 * @param prefix
 * @param type
 * @param input
 * @param currentPath
 * @param flag
 * @param callBack
 */
GanttChartPresenter.createDimension = function(prefix,type,input,currentPath,flag,callBack){
    CreateDimensions.createDim(prefix,type,input,currentPath,flag,callBack);
}

/**
 *
 * @param prefix
 * @param type
 * @param input
 * @param callback
 */
GanttChartPresenter.deleteDimension = function(prefix,type,input,callback){
    DeleteDimension.deleteDim(prefix,type,input,callback);
}

/**
 *
 * @param prefix
 * @param row
 * @param oldPath
 * @param flag
 * @param newPath
 * @param callBack
 */
GanttChartPresenter.dragAndDropDimensions = function(prefix,row,oldPath,flag,newPath,callBack){
    DragDimension.dragAndDropDimensions(prefix,row,oldPath,flag,newPath,callBack);
}

/**
 *
 * @param prefix
 * @param row
 * @param callback
 */
GanttChartPresenter.updateDimension = function(prefix,row,callback){
    UpdateDimension.updateDim(prefix,row,callback);
}

/**
 *
 * @param comChannelObj
 * @param callback
 */
GanttChartPresenter.getPublications = function(comChannelObj,callback){
   /* var url = "http://192.168.135.104/CS13.0Trunk/admin/forward.php?forward=../CSLive/playCSVideoPlayerUsingMamFile.php&mamFileNo=7547";
    window.open(url,"_blank");*/
    GetPublications.get(comChannelObj,callback);
}
