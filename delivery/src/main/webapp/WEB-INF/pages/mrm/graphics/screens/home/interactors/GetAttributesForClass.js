function GetAttributesForClass(){

}

GetAttributesForClass.getAllAttributes = function(classId, callBack){

    Router.loadPhpGetRequest("getAttributesForClass",true,callBack,classId);
}

