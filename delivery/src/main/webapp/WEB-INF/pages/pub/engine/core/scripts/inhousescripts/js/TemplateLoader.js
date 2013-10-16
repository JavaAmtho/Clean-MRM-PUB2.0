/**
 *
 * @constructor  TemplateLoader
 */
var TemplateLoader = function(){

}

/**
 *
 * @param url
 * @param async
 * @param callback
 * @description AJAX request to a server with GET method to load templates
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
 * @description common gateway for all template loading requests from the application
 */
TemplateLoader.loadTemplate = function(key,callBack,containerID){
    //This sets the default value for the containerElementID
    containerID = typeof containerID !== ('undefined'||"") ? containerID : "mainContainer";

    if(EngineDataStore.getScreenMappingObject()[key].needStyle == "true"){
        var styleName = EngineDataStore.getScreenMappingObject()[key].className;
    }

    TemplateLoader.forward(EngineDataStore.getScreenMappingObject()[key].screenName,true,function(data){
        TemplateLoader.designScreen(data,containerID,styleName);
        if(callBack){
            callBack();
        }

    });

}

/**
 *
 * @param data
 * @param containerID
 * @param styleName
 * @description places the response html inside respective container
 */
TemplateLoader.designScreen = function(data,containerID,styleName){
    var placeHolderElement = document.getElementById(containerID);
    placeHolderElement.innerHTML = data.html;

    TemplateLoader.addStyleToContainer(containerID,styleName);

    if(data.events){
        TemplateLoader.attachEvents(data.events);
    }
    if(data.elements){
        TemplateLoader.createElements(data.elements);
    }

}

/**
 *
 * @param containerID
 * @param styleName
 * @description adds style to the respective container
 */
TemplateLoader.addStyleToContainer = function(containerID,styleName){
    $("#"+containerID).addClass(styleName);
}

/**
 *
 * @param events
 * @description attaches the events by calling HtmlEventDesigner.addEvents method for all entries in events.json for respective template
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
 * @description creates the elements by calling HtmlElementDesigner.design method for all entries in elements.json for respective template
 */
TemplateLoader.createElements = function(elements){
    elements=eval('(' + elements + ')');
    for (var element in elements){
        HtmlElementDesigner.design(elements[element].id,elements[element].scriptName,elements[element].screenName);
    }
}