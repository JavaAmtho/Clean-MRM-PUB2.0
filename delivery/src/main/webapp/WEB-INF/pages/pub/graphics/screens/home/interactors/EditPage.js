function EditPage(){

}

EditPage.edit = function(prefix,id,pageObj,callBack){
    Router.forwardWithPost(prefix+id,true,pageObj,callBack);
}

