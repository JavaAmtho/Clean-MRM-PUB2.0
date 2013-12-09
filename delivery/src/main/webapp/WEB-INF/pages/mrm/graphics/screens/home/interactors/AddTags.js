function AddTags(){

}

AddTags.add = function(key,nameOfTag,callBack){
     Router.loadPhpGetRequest(key,true,callBack,nameOfTag)
}

