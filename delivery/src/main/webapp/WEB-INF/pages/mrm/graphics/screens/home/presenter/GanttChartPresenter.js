var myData;

/**
 *
 * @constructor   GanttChartPresenter
 */
var GanttChartPresenter = function(){

    $("#treeGantt").addClass("calendarButtonPressed");

    var ganttElements = document.getElementsByClassName("GanttProperties");
    for(var i = 0; i < ganttElements.length; i++) {
        ganttElements[i].style.visibility = "visible";
    }

    /**
     *
     * @param id
     * @description creates a ganttChart instance  but this is a wrapper method
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
                //This is to get all tags defined
                GetTags.getAllTags("getAllTags",function(data){
                    GraphicDataStore.setTagsCollection(data);
                });

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
 * @description calls getTree interactor
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
 * @description calls createDimension interactor
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
 * @description calls DeleteDimension interactor
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
 * @description calls DragDimension interactor
 */
GanttChartPresenter.dragAndDropDimensions = function(prefix,row,oldPath,flag,newPath,callBack){
    DragDimension.dragAndDropDimensions(prefix,row,oldPath,flag,newPath,callBack);
}

/**
 *
 * @param prefix
 * @param row
 * @param callback
 * @description calls updateDimension interactor
 */
GanttChartPresenter.updateDimension = function(prefix,row,callback){
    UpdateDimension.updateDim(prefix,row,callback);
}

/**
 *
 * @param comChannelObj
 * @param callback
 * @description calls GetPublications interactor
 */
GanttChartPresenter.getPublications = function(comChannelObj,callback){
    GetPublications.get(comChannelObj,callback);
}

/**
 * @param data
 * @description callBack for the getPublications to get the imageurl for coverflow for respective publication
 */
GanttChartPresenter.onPublicationHandler = function(data){
    var pubImageList = EngineDataStore.getPublicationDetailsArray();
    $.each(data, function(key, value){
        var pubObj = value;
        var pubName = pubObj.name;
        var imageObjForPub = pubImageList[pubName];
        if(imageObjForPub)
        {
            var config = pubImageList["Config"];
            pubObj.previewImage = config.host+config.context+imageObjForPub.previewImage;
            pubObj.actualImage = config.host+config.context+imageObjForPub.actualImage;
            pubObj.previewType = imageObjForPub.previewType;
        }
    });
    HomePresenter.createFlow(data);
}
