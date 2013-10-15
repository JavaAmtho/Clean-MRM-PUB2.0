/**
 *
 * @constructor      CreateDimensions
 */
function CreateDimensions(){

}

/**
 *
 * @param prefix
 * @param action
 * @param input
 * @param currentPath
 * @param flag
 * @param callBack
 */
CreateDimensions.createDim = function(prefix,action,input,currentPath,flag,callBack){
    var reqBody = new Object();
    reqBody.name=input.name;
    reqBody.managerName=input.managerName;
    reqBody.startDate=input.startDate;
    reqBody.endDate=input.endDate;
    reqBody.budgetOwner=input.budgetOwner;
    //reqBody.type=input.type;    //Only for mocks
    if(input.budget)
    reqBody.budget=input.budget;
    Router.forwardWithPost(prefix+action+"/name/"+input.name+"/path/"+currentPath+"/folder/"+flag,true,reqBody,function(data){
        callBack(data);
    });
}

