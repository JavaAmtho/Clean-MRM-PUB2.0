function CreateWBD(){

}

CreateWBD.createWBD = function(ruleID,logicalPageID,publicationID,callBack){
    Router.loadRequest("createWBD",true,callBack,ruleID + "/" + logicalPageID + "/" + publicationID )
}
