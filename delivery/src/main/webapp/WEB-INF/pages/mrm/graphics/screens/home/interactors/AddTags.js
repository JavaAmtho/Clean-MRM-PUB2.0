function AddTags(){

}

AddTags.add = function(nameOfTag,callBack){
     Router.loadPhpGetRequest("addTags",true,callBack,nameOfTag)
}

