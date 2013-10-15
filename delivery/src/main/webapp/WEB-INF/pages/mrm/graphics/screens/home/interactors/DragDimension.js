/**
 *
 * @constructor   DragDimension
 */
function DragDimension(){

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
DragDimension.dragAndDropDimensions = function(prefix,row,oldPath,flag,newPath,callBack){
    var input = new Object();
    input.name=row.name;
    input.id=row.id;
    input.type=row.type;
    input.groupId=row.groupId;
    input.path=row.path;
    input.title=row.title;

    input.dimensionInfo={"managerName":row.manager, "name":row.name, "startDate":row.startDate,"endDate":row.endDate,
                            "budget":row.budget,"budgetOwner":row.budgetOwner,"currency":row.currency};
    Router.forwardWithPost(prefix+oldPath+"/"+newPath,true,input,callBack);
}

