function EditPage(){

}

EditPage.edit = function(prefix,id,pageObj,callBack){
    Router.forwardWithPost(EngineDataStore.getRestBaseUrl()+prefix+id,true,pageObj,callBack);
}

