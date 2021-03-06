/**
 *
 * @constructor       UpdateDimension
 */
function UpdateDimension(){

}

/**
 *
 * @param prefix
 * @param row
 * @param callBack
 */
UpdateDimension.updateDim = function(prefix,row,callBack){
    var input = new Object();
    input.name=row.name;
    input.id=row.id;
    input.type=row.type;
    input.groupId=row.groupId;
    input.path=row.path;
    input.title=row.title;
    input.dimensionInfo={"managerName":row.manager, "name":row.name, "startDate":row.startDate,"endDate":row.endDate,
        "budget":row.budget,"budgetOwner":row.budgetOwner,"currency":row.currency,"classId":row.classId,"customAttributes":row.customAttributes};

    Router.forwardWithPost(EngineDataStore.getRestBaseUrl()+prefix+row.id,true,input,callBack);
}

