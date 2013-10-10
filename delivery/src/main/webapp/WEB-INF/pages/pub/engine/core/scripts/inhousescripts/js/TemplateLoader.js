/**
 *
 * @constructor
 */
var TemplateLoader = function(){

}

/**
 *
 * @param url
 * @param async
 * @param callback
 */
TemplateLoader.forward = function(url,async,callback){
    $.ajax({
        url:url,
        async:async,
        success:function(result){
            callback(result);
        },
        error: function (error) {
            callback("error");
        }
    });
}

/**
 *
 * @param key
 * @param callBack
 * @param containerID
 */
TemplateLoader.loadTemplate = function(key,callBack,containerID){
    //This sets the default value for the containerElementID
    containerID = typeof containerID !== ('undefined'||"") ? containerID : "mainContainer";

    //Comment this and uncomment line below this while DEPLOYING
     /*TemplateLoader.forward(EngineDataStore.getScreenMappingObject()[key].url,true,function(data){
         TemplateLoader.designScreen(data,containerID);
         if(callBack){
            callBack();
         }
     });*/

    TemplateLoader.forward(EngineDataStore.getScreenMappingObject()[key].screenName,true,function(data){
        TemplateLoader.designScreen(data,containerID);
        if(callBack){
            callBack();
        }

    });

}

/**
 *
 * @param data
 * @param containerID
 */
TemplateLoader.designScreen = function(data,containerID){
    //Comment this while DEPLOYING
    //data=eval('(' + data + ')');
    var placeHolderElement = document.getElementById(containerID);
    placeHolderElement.innerHTML = data.html;

    if(data.events){
        TemplateLoader.attachEvents(data.events);
    }
    if(data.elements){
        TemplateLoader.createElements(data.elements);
    }

}

/**
 *
 * @param events
 */
TemplateLoader.attachEvents = function(events){
    events=eval('(' + events + ')');
    for (var binding in events){
        HtmlEventDesigner.addEvents(events[binding].id,events[binding].event,events[binding].func,false);
    }
}

/**
 *
 * @param elements
 */
TemplateLoader.createElements = function(elements){
    elements=eval('(' + elements + ')');
    for (var element in elements){
        HtmlElementDesigner.design(elements[element].id,elements[element].scriptName,elements[element].screenName);
    }
}