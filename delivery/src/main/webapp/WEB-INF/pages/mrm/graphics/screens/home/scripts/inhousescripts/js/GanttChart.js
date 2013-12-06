var GanttChart = function(){
    var currentPath;
    var parentNode;
    var newNode
    var dropTargetType
    var input;
    var cellOldValue;

    /**
     * @param id
     * @description creates new instance of actual Gantt chart
     */
    this.createGanttChart = function(id){
        TreeGrid({Layout:{Url:EngineDataStore.getBaseURL()+"graphics/screens/home/scripts/inHouseScripts/js/Def_temp.xml"},
        Data:{Script:"myData"},Debug:""},id);
    }

    /**
     * @param G
     * @constructor
     * @description eventListner when gantt chart instance is created
     */
    Grids.OnGanttStart = function(G){
        setTimeout(function() {
            $( "#mrmGanttChart" ).resizable({
                maxHeight: 400,
                minHeight: 150
            });
            HomePresenter.viewTreeAndGantt();
        }, 1000);
    }

    /**
     * Get Context Menu
     * Logic for Highlighting Row on Right Click
     * @param G
     * @param row
     * @param col
     * @returns {{Items: Array}}
     * @constructor
     * @description eventListner when user right clicks on any row and displays it  Shows contextmenu as per the type of row
     */
    Grids.OnGetMenu = function(G,row,col){
        Grids[0].Focus(row,0,0);
        var possibleDim=[];
        possibleDim  = GraphicDataStore.getPossibleChild(row.type);
        var menuItems = [];
        var menu = {Items:menuItems};

        if(possibleDim != ""){
            for(var i=0; i< possibleDim.length; i++){
                //This is to create possible dimensions on click of currentNode
                var item = {};
                var keyName = "Name";
                item[keyName] = possibleDim[i];
                var keyName = "Text";
                item[keyName] = "Create "+possibleDim[i];
                menuItems.push(item);
            }

        }

        if(row.type != "root"){
            //This is to delete the currentNode
            var deleteItem = {};
            var keyName = "Name";
            deleteItem[keyName] = "Delete";
            var keyName = "Text";
            deleteItem[keyName] = "Delete";
            menuItems.push(deleteItem);

            //This is to edit the currentNode
            var editItem = {};
            var keyName1 = "Name";
            editItem[keyName1] = "Edit";
            var keyName1 = "Text";
            editItem[keyName1] = "Edit";
            menuItems.push(editItem);

            //This is to view the currentNode
            var viewItem = {};
            var keyName2 = "Name";
            viewItem[keyName2] = "View";
            var keyName2 = "Text";
            viewItem[keyName2] = "View";
            menuItems.push(viewItem);
        }
        return menu;
    }

    /**
     * @param grid
     * @param row
     * @param col
     * @param Menu
     * @param GanttXY
     * @returns true
     * @description eventListner when user right clicks on gantt bars row
     */
    Grids.OnGanttMenu = function(grid,row,col,Menu,GanttXY) {
        return true;
    }

    /**
     * Delete a row from Gantt
     */
    GanttChart.onDeleteSuccess=function(){
        Grids[0].DeleteRow(currentRow,2);
        alertify.success("Deleted successfully");
    }

    /**
     * @param G
     * @param row
     * @param col
     * @param name
     * @description eventListner when user clicks on any of the entries of generated contextmenu
     */
    Grids.OnContextMenu = function(G,row,col,name){

        currentRow = row;
        //console.log(currentRow)
        switch (name) {
            case "Delete":
                var r=confirm("Are you sure you want to delete "+ row.name+" ?");
                if (r==true)            {
                    var input=new Object();
                    input.id=row.id;
                    input.name=row.name;
                    input.type=row.type;
                    input.groupId=row.groupId;
                    var prefix=getUrlPrefix(row.type,"delete");
                    GanttChartPresenter.deleteDimension(prefix,row.type,input,GanttChart.onDeleteSuccess);
                }
                break;
            case "Edit":
                EditDimensionDialog.create(G,row,col,name);
                break;
            case "View":
                ViewDimensionDialog.create(G,row,col,name);
                break;
            default :
                CreateDimensionDialog.create(G,row,col,name);
                break;
        }
    }

    /**
     * @param grid
     * @param row
     * @param type
     * @returns {number}
     * @description eventListner when user deletes any row called before it actually calls delete api
     */
    Grids.OnCanRowDelete = function(grid,row,type){
        if(type==1){
            var r=confirm("Are you sure you want to delete "+ row.name+" ?");
            if (r==true)            {
                var input=new Object();
                input.id=row.id;
                input.name=row.name;
                input.type=row.type;
                input.groupId=row.groupId;
                var prefix=getUrlPrefix(row.type,"delete");
                GanttChartPresenter.deleteDimension(prefix,row.type,input,GanttChart.onDeleteSuccess);
                return 2;
            }
        }
        if(type == 2){
            return 2;
        }
    }

    /**
     * @param grid
     * @param row
     * @param col
     * @returns true if row is root otherwise false
     * @description eventListner when user starts dragging any row
     */
    Grids.OnStartDrag = function(grid,row,col){
        //To suppress the dragging as per the dimension type
        if(row.type == "root") {
            return true;
        }
        return false;
    }

    /**
     * @param grid
     * @param row
     * @param togrid
     * @param torow
     * @param type
     * @param copy
     * @returns {number}
     * @description eventListner when user drps any row called before the row is dropped
     */
    Grids.OnCanDrop = function(grid,row,togrid,torow,type,copy){
        dropTargetType = GraphicDataStore.getPossibleDropParent(row.type);
        var dropTargetFound = $.inArray(torow.type, dropTargetType)
        if(dropTargetFound != -1){
            return 2;
        }
        return 0;

    }

    /**
     * @param grid
     * @param row
     * @param col
     * @param val
     * @description eventListner when user updates ant entry in the row
     */
    Grids.OnAfterValueChanged = function(grid,row,col,val){
        //cellOldValue = row[col];
        if(row.id != "AR1"){
            var prefix;
            prefix =getUrlPrefix(row.type,"update");
            GanttChartPresenter.updateDimension(prefix,row,GanttChartPresenter.onUpdate)
            //Make an api call with val
        }else{
        }

    }

    /**
     * Restrict delete of root node
     * @param grid
     * @param row
     * @param col
     * @description eventListner when rows are rendered
     */
    Grids.OnRenderRow = function(grid,row,col){
       if(row.type == 'root'){
           Grids[0].SetValue(row,"CanDelete","0");
           Grids[0].SetValue(row,"CanSelect","0");

       }

    }

    /**
     * @param G
     * @param row
     * @param col
     * @param width
     * @param comp
     * @param crit
     * @returns string containing HTML to display Gantt Bar w.r.t. type
     * @description eventListner when gantt bars are rendered
     */
    Grids.OnGetGanttHtml = function(G,row,col,width,comp,crit){
        switch(row.type){
            case "MarketingInitiative":
                Grids[0].SetValue(row,"nameIcon","../../../graphics/screens/home/images/cal1.png",1);
                return "<div style=\"background: #6e6e6e;color:white;padding:2px; height: 11px; border:1px solid #6e6e6e; border-radius: 4px;  box-shadow: 2px 2px 3px rgba(255, 255, 255, .9) inset; \"></div>";
            case "Campaign":
                Grids[0].SetValue(row,"nameIcon","../../../graphics/screens/home/images/cal2.png",1);
                return "<div style=\"background: #7a8b8b;color:white;padding:2px; height: 11px; border:1px solid  #7a8b8b ; border-radius: 4px;  box-shadow: 2px 2px 3px rgba(255, 255, 255, .9) inset\"></div>";
            case "SubCampaign":
                Grids[0].SetValue(row,"nameIcon","../../../graphics/screens/home/images/cal1.png",1);
                return "<div style=\"background: #b4cdcd;color:white;padding:2px; height: 11px; border:1px solid #b4cdcd; border-radius: 4px;  box-shadow: 2px 2px 3px rgba(255, 255, 255, .9) inset\"></div>";
            case "CommunicationPlan":
                Grids[0].SetValue(row,"nameIcon","../../../graphics/screens/home/images/cal2.png",1);
                return "<div style=\"background: #b0e0e6;color:white;padding:2px; height: 11px; border:1px solid #b0e0e6; border-radius: 4px;  box-shadow: 2px 2px 3px rgba(255, 255, 255, .9) inset\"></div>";
            case "CommunicationChannel":
                Grids[0].SetValue(row,"nameIcon","../../../graphics/screens/home/images/cal2.png",1);
                return "<div style=\"background: #60affe;color:white;padding:2px; height: 11px; border:1px solid #60affe; border-radius: 4px;  box-shadow: 2px 2px 3px rgba(255, 255, 255, .9) inset\"></div>";
            default:
                return null;
        }

    }

    /**
     * @param grid
     * @param row
     * @param togrid
     * @param torow
     * @param type
     * @param X
     * @param Y
     * @param copy
     * @description eventListner when row is dropped
     */
    Grids.OnEndDrag = function(grid,row,togrid,torow,type,X,Y,copy){
       if(type === 2){
           var oldPathForChild = row.path;
           var newChildNode = row;
           var parentNode = torow;
           newChildNode.path = parentNode.path +","+parentNode.title;
           var newPathForChild = newChildNode.path;

           if(newPathForChild.indexOf("-1")==0)
               newPathForChild = newPathForChild.match(/([^,]*),(.*)/)[2];   //To remove -1 root folder

           var flag=isFolder(newChildNode.type);
           var prefix;
           prefix =getUrlPrefix(row.type,"move");
           prefix = prefix+row.type;
           GanttChartPresenter.dragAndDropDimensions(prefix,row,oldPathForChild,flag,newPathForChild,onDropSuccess);
       }
    }

    /**
     * @param grid
     * @param row
     * @param col
     * @param x
     * @param y
     * @description eventListner when any row is clicked
     */
    Grids.OnClick = function(grid,row,col,x,y){
        if(row.id != "Header"){
            if(col === "name"){
                if(row.type === "CommunicationPlan"){
                    //Call to server to get the publications of this Communication Channel
                    GanttChartPresenter.getPublications(row,GanttChartPresenter.onPublicationHandler);
                }
                else{
                    HomePresenter.hideCoverflow();
                }
            }
            if(col != "ganttChart") {
                Grids[0].ScrollToDate(row.startDate,"Center");
            }
        }
    }


    Grids.OnExpand = function(grid,row){
        var currentChild = row.firstChild;
        while(currentChild){
            switch(currentChild.type){
                case "MarketingInitiative":
                    Grids[0].SetValue(currentChild,"nameIcon","../../../graphics/screens/home/images/cal1.png",1);
                    break;
                case "Campaign":
                    Grids[0].SetValue(currentChild,"nameIcon","../../../graphics/screens/home/images/cal1.png",1);
                    break;
                case "SubCampaign":
                    Grids[0].SetValue(currentChild,"nameIcon","../../../graphics/screens/home/images/cal1.png",1);
                    break;
                case "CommunicationPlan":
                    Grids[0].SetValue(currentChild,"nameIcon","../../../graphics/screens/home/images/cal2.png",1);
                    break;
                case "CommunicationChannel":
                    Grids[0].SetValue(currentChild,"nameIcon","../../../graphics/screens/home/images/cal2.png",1);
                    break;
                default:
                    Grids[0].SetValue(currentChild,"nameIcon","../../../graphics/screens/home/images/cal2.png",1);
                    break;
            }
            currentChild = currentChild.nextSibling;
        }
    }



    /**
     * @param grid
     * @param row
     * @param col
     * @param name
     * @param start
     * @param end
     * @param oldstart
     * @param oldend
     * @param dir
     * @param XY
     * @param keyprefix
     * @param clientX
     * @param clientY
     * @param ToRow
     * @description eventListner when dragging of gantt bars is ended
     */
    Grids.OnEndDragGantt = function(grid, row, col, name, start, end,
        oldstart, oldend, dir, XY, keyprefix, clientX, clientY, ToRow){
            row.startDate = start;
            row.endDate = end;
            var prefix;
            prefix =getUrlPrefix(row.type,"update");
            GanttChartPresenter.updateDimension(prefix,row,GanttChartPresenter.onUpdate)
    }

    /**
     * @param data
     */
    GanttChartPresenter.onUpdate = function(data){
        //alert(JSON.stringify(data))
    }

    /**
     *
     * @param data
     */
    function onDropSuccess(data){
        //Need to handle

    }

    /**
     * @param name
     * @param type
     * @param path
     * @param icon
     * @returns new row{{id: string, title: name, type: type, path: path, nameIcon: icon, Items: Array}}
     */
    function  createNewRow(name,type,path,icon){
        var newRowNode = {
            "id": "",
            "title": name,
            "type": type,
            "path": path,
            "nameIcon":icon,
            "Items": []
        }
        return newRowNode;
    }

    function onFilter(){
        //alert(123);
    }

}

/**
 * Flush data in popup form
 * @param form
 */
function clearForm(form)
{
    $(":input", form).each(function()
    {
        var type = this.type;
        var tag = this.tagName.toLowerCase();
        if (type == 'text')
        {
            this.value = "";
        }
    });


}

/**
 * @param dim
 * @returns true
 */
function isFolder(dim){
    var flag =true;
    /*if(dim == "Page" || dim == "Assortment"){
     flag = false;
     }*/
    return flag;
}

/**
 * @param type
 * @param action
 * @returns path(URL Prefix) w.r.t. type
 */
var getUrlPrefix=function(type,action){
    switch(type){
        case "Chapter":
            return  "/delivery/chapter/"+action+"/";
        case "Page":
            return  "/delivery/page/"+action+"/";
        case "Assortment":
            return  "/delivery/assortment/"+action+"/";
    }
    return "/delivery/dimension/"+action+"/";
};

var currentRow;
/**
 * Assigning icons to rows w.r.t. type
 * @param data
 */
GanttChart.addNode = function(data){
    if(data !== "error"){
        closeDimensionDialog();
        Grids[0].AddRow(currentRow,null,1);
        Grids[0].SetValue(currentRow.lastChild,"name",data.name,1);
        Grids[0].SetValue(currentRow.lastChild,"title",data.title,1);
        Grids[0].SetValue(currentRow.lastChild,"path",data.path,1);
        Grids[0].SetValue(currentRow.lastChild,"id",data.id,1);
        Grids[0].SetValue(currentRow.lastChild,"groupId",data.groupId,1);
        Grids[0].SetValue(currentRow.lastChild,"type",data.type,1);
        Grids[0].SetValue(currentRow.lastChild,"budgetOwner",data.budgetOwner,1);
        Grids[0].SetValue(currentRow.lastChild,"budget",data.budget,1);
        Grids[0].SetValue(currentRow.lastChild,"startDate",data.startDate,1);
        Grids[0].SetValue(currentRow.lastChild,"endDate",data.endDate,1);
        Grids[0].SetValue(currentRow.lastChild,"manager",data.manager,1);
        Grids[0].SetValue(currentRow.lastChild,"Items",data.Items,1);
        switch(data.type){
            case "MarketingInitiative":
                Grids[0].SetValue(currentRow.lastChild,"nameIcon","../../../graphics/screens/home/images/cal1.png",1);
                break;
            case "Campaign":
                Grids[0].SetValue(currentRow.lastChild,"nameIcon","../../../graphics/screens/home/images/cal1.png",1);
                break;
            case "SubCampaign":
                Grids[0].SetValue(currentRow.lastChild,"nameIcon","../../../graphics/screens/home/images/cal1.png",1);
                break;
            case "CommunicationPlan":
                Grids[0].SetValue(currentRow.lastChild,"nameIcon","../../../graphics/screens/home/images/cal2.png",1);
                break;
            case "CommunicationChannel":
                Grids[0].SetValue(currentRow.lastChild,"nameIcon","../../../graphics/screens/home/images/cal2.png",1);
                break;
            default:
                Grids[0].SetValue(currentRow.lastChild,"nameIcon","../../../graphics/screens/home/images/cal2.png",1);
                break;
        }

        Grids[0].SetScrollTop(Grids[0].GetScrollTop()+30) ;

        Grids[0].ScrollToDate(data.startDate,"Left");
        //Grids[0].Recalculate(currentRow,"startDate",1);
        alertify.success(""+data.type+" added successfully");
    }
    else{
        alertify.error("Duplicate names are not allowed");
    }
}

