var temp;

/**
 *
 * @constructor
 */

var DynaTree = function(){
    var currentPath;
    var parentNode;
    var nodeToBeDeleted;
    var nodeToBeEdited;
    var newNode

    /**
     *
     * @param type
     * @returns {boolean}  if the context menu exists for this type of dimension
     */
    function menuExists(type){
        var contextMenusHolder = document.getElementById('menus')
        uls = contextMenusHolder.getElementsByTagName('ul');
        for (i=0; i<uls.length; i++) {
            if (uls[i].id == type) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param type
     * @param menuOptions
     * @description creates a list if menu doesn't exist for the given type of dimension
     */
    function createList(type,menuOptions){
        var contextMenusHolder = document.getElementById('menus');
        var options = menuOptions;
        var list = document.createElement("ul");
        list.id = type;
        list.setAttribute("class", "contextMenu");
        //list.addClass("contextMenu");
        for (var i in options) {
            var anchor = document.createElement("a");
            anchor.href = "#"+options[i];
            //anchor.innerText = "Create"+options[i];
            anchor.textContent = "Create "+options[i];
            var elem = document.createElement("li");
            elem.appendChild(anchor);
            list.appendChild(elem);
        }

        if(type != "root" && type != "Assortment"){
            var editAnchor = document.createElement("a");
            editAnchor.href = "#edit";
            editAnchor.textContent = "Edit";
            var editElem = document.createElement("li");
            editElem.appendChild(editAnchor);
            list.appendChild(editElem);
        }

        if(type != "root" && type != "Assortment"){
            var deleteAnchor = document.createElement("a");
            deleteAnchor.href = "#delete";
            deleteAnchor.textContent = "Delete";
            var delElem = document.createElement("li");
            delElem.appendChild(deleteAnchor);
            list.appendChild(delElem);
        }

        contextMenusHolder.appendChild(list);
    }

    /**
     * Contextmenu
     *
     * @param span
     * @param type
     */
    function bindContextMenu(span,type) {
        var possibleDim=[];
        possibleDim  = GraphicDataStore.getPossibleChild(type);

        if(possibleDim != ""){
            //Check if context menu exists for the type of node
            var alreadyExists = menuExists(type)
            if(!alreadyExists){
                createList(type,possibleDim);
            }

            //On click of contextmenu options
            $(span).contextMenu({menu: type}, function(action, el, pos) {
                parentNode = $.ui.dynatree.getNode(el);
                if(parentNode.data.type == "root"){
                    currentPath = "-1";
                }
                else{
                    currentPath = parentNode.data.path+","+ parentNode.data.id;
                    if(currentPath.indexOf("-1")==0)
                        currentPath = currentPath.match(/([^,]*),(.*)/)[2];   //To remove -1 root folder
                }
                var flag = isFolder(action);

                if(action === "edit"){     //Edit page with same popup for create new page
                    nodeToBeEdited = $.ui.dynatree.getNode(el);
                    /*If the type of element is not page*/
                    if(nodeToBeEdited.data.type !== "Page"){
                        showCreateEditDimensionDialog(nodeToBeEdited.data.type,flag,"Edit",nodeToBeEdited.data.title);
                    }else{
                        showCreateEditPageDialog("Edit","Page",flag);
                    }
                }else{
                    if(action != "delete"){
                        if(action == "Page"){ //Create page with all other fields such as masterTemp and type and renderer
                             showCreateEditPageDialog("Create",action,flag);
                        }else{
                            //Create dimensions with only name
                            showCreateEditDimensionDialog(action,flag,"Create");
                        }
                    }else{
                        //Delete dimensions
                        nodeToBeDeleted = $.ui.dynatree.getNode(el);
                        showDeletePrompt(nodeToBeDeleted);
                    }
                }
            });

        }
    }

    function showCreateEditPageDialog(type,action,flag){
        if(type === "Create"){
            $(document).bind("createPageEvent", function createPageHandler(e) {
                var prefix=getUrlPrefix(action,"create");
                newNode = createNode(e.pageObj.name,action,currentPath,flag,e.pageObj);
                TreePresenter.createPage(prefix,action,e.pageObj.name,currentPath,flag, e.pageObj,addNode);
                $(document).unbind("createPageEvent");
            });
            WidgetPresenter.createWidgetForNewPage("BreadCrumb");
        }else{
            $(document).bind("editPageEvent", function editPageHandler(e) {
                var prefix=getUrlPrefix(action,"update");
                newNode = createNode(e.pageObj.name,action,currentPath,flag,e.pageObj);
                e.pageObj.id = nodeToBeEdited.data.id;
                TreePresenter.editPage(prefix,e.pageObj.id,e.pageObj,editNode);
                $(document).unbind("editPageEvent");
            });
            WidgetPresenter.createWidgetForNewPage("BreadCrumb",nodeToBeEdited.data);
        }
    }

    function editNode(data){
        nodeToBeEdited.data = data.response;
        nodeToBeEdited.render();
    }
    function editDimension(data){
        nodeToBeEdited.data.title = data.responseString;
        nodeToBeEdited.render();
    }

    function showDeletePrompt(nodeToBeDeleted){
        alertify.confirm("Are you sure you want to delete "+ nodeToBeDeleted.data.title, function (e) {
            if (e) {
                //Send API call to delete the node
                var input=new Object();
                input.id=nodeToBeDeleted.data.id;
                input.title=nodeToBeDeleted.data.title;
                input.type=nodeToBeDeleted.data.type;
                input.groupId=nodeToBeDeleted.data.groupId;
                var prefix=getUrlPrefix(nodeToBeDeleted.data.type,"delete");
                TreePresenter.deleteDimension(prefix,nodeToBeDeleted.data.type,input,onDeleteSuccess);

            } else {
            }
        });
    }

    function showCreateEditDimensionDialog(action,flag,type,defaultName){
        if(type == "Create"){
            alertify.prompt("Please enter "+action+" name", function (e, name) {
                if (e) {
                    name = name.replace(/^\s+|\s+$/g,'')
                    if(name.length >0){
                        var prefix=getUrlPrefix(action,"create");
                        if(action == "Assortment"){
                            newNode = createAssortmentNode(name,action,currentPath,flag);
                            TreePresenter.createAssortment(prefix,action,name,currentPath,flag,addNode);
                        }else{
                            newNode = createNode(name,action,currentPath,flag);
                            TreePresenter.createDimension(prefix,action,name,currentPath,flag,addNode);
                        }
                    }
                    else{
                        alertify.error("Please enter a valid name");
                    }
                }
            },defaultName);
        }else{
            alertify.prompt("Please enter "+action+" name", function (e, name) {
                if (e) {
                    name = name.replace(/^\s+|\s+$/g,'')
                    if(name.length >0){
                        var prefix=getUrlPrefix(action,"update");
                        nodeToBeEdited.data.title = name;
                        TreePresenter.updateDimension(prefix,nodeToBeEdited.data.id,nodeToBeEdited.data,editDimension);
                    }
                    else{
                        alertify.error("Please enter a valid name");
                    }
                }
            },defaultName);
        }


    }

    function  onDeleteSuccess(){
        nodeToBeDeleted.remove();
        var parNode = nodeToBeDeleted.parent;
        for(var i=0; i< parNode.data.children.length; i++){
            if(nodeToBeDeleted.data.title == parNode.data.children[i].title){
                parNode.data.children.splice(i,1);
            }
        }
        alertify.success("Deleted successfully");
        parNode.activate();
    }

    /**
     *
     * @param data
     * @description callBack on adding new node in tree
     */
    function addNode(data){
        if(data){
/*            if((newNode.type !="Chapter"))
                    if(newNode.type !="Assortment")*/
                        newNode = data;

            parentNode.addChild(newNode).activate();
             var node_expand = parentNode.isExpanded();
             if(node_expand == false)
             parentNode.expand();

             if(parentNode.data.children==null){
                parentNode.data.children=[];
             }

             parentNode.data.children.push(newNode);
            alertify.success(""+newNode.type+" added successfully");
        }
        else{
            alertify.error("Duplicate names are not allowed");
        }
    }

    /**
     *
     * @param name
     * @param type
     * @param path
     * @param flag
     * @returns {{id: Empty String, title: name, type: type, path: path, isFolder: 'true' if folder, products: Empty Array}}
     * @description creates an assortment node
     */
    function createAssortmentNode(name,type,path,flag){
        var flag = isFolder(type);
        var newNode = {
            "id": name,
            "title": name,
            "type": type,
            "path": path,
            "isFolder": flag,
            "products": []
        }
        return newNode;
    }

    /**
     *
     * @param name
     * @param type
     * @param path
     * @param flag
     * @returns {{id: Empty String, title: name, type: type, path: path, isFolder: 'true' if folder, children: Empty Array}}
     */
    function createNode(name,type,path,flag,pageInfo){

        var flag = isFolder(type);
        var newNode = {
                        "id": name,
                        "title": name,
                        "type": type,
                        "path": path,
                        "isFolder": flag,
                        "children": [],
                        "pageInfo": pageInfo ? pageInfo : {}
                     }
        return newNode;
    }

    /**
     *
     * @param dim
     * @returns true if dim equals 'Page' or 'Assortment'
     */
    function isFolder(dim){
        var flag =true;
        if(dim == "Page" || dim == "Assortment"){
            flag = false;
        }
        return flag;
    }

    /**
     *
     * @param type
     * @param action
     * @returns a part of URL w.r.t. type
     */
    var getUrlPrefix=function(type,action){
        switch(type){
            case "Chapter":
                return  "chapter/"+action+"/";
            case "Page":
               return  "page/"+action+"/";
            case "Assortment":
                return  "assortment/"+action+"/";
        }
        return "/dimension/"+action+"/";
    }

    /**
     * function onDropSuccess
     * @description called on end of the drag event while dragging and
     *              dropping an element in the dyna tree
     */
    function onDropSuccess(){
        /*console.log(draggedNode + "draggedNode")
        console.log(droppedSrcNode + "droppedSrcNode NEW")
        console.log(oldParentNode + "oldParentNode OLD")
*/
        if(draggedNode.data.type == "Assortment"){
            var cb = draggedNode.toDict(true, function(dict){
                //dict.title = "Copy of " + dict.title;
                delete dict.key; // Remove key, so a new one will be created
            });
            droppedSrcNode.addChild(cb);
        }
        else{
            draggedNode.move(droppedSrcNode, dragHitMode);
            for(var i=0; i< oldParentNode.data.children.length; i++){
                if(draggedNode.data.title == oldParentNode.data.children[i].title){
                    oldParentNode.data.children.splice(i,1);
                }
            }
        }

        droppedSrcNode.data.children.push(draggedNode.data);
        droppedSrcNode.activate();
        droppedSrcNode.expand();
    }

    var draggedNode;
    var dragHitMode;
    var droppedSrcNode;
    var oldParentNode;

    var currentClickedNode;


    function getPageRendererType(currentPage){
        if(currentPage.data.pageType === "creative"){
            return currentPage.data.renderEngineType;
        }else{
            return null;
        }
    }


    function showCurrentActivatedNode(){
        var nodeType = "Dimension";
        var data;

        if(currentClickedNode.data.type == "Assortment"){
            $('#showAllPagesBtn').addClass('hidden');
            var currentPage = $.ui.dynatree.getNode(currentClickedNode).parent;
            DynaTree.rendererType = getPageRendererType(currentPage);
            nodeType = "Assortment";
            GraphicDataStore.setCurrentAssortment(currentClickedNode.data);
            data = currentClickedNode.data.products;//HomePresenter.getProductsForSelectedNode(node);
            //alert(JSON.stringify(data.length))
        }else{
            GraphicDataStore.setCurrentView(currentClickedNode.data.title);
            data = HomePresenter.getChildrenForSelectedNode(currentClickedNode)
            if(currentClickedNode.data.type == "Publication"){
                $('#showAllPagesBtn').css('opacity','1');
                $('.option-combo').css('opacity','1');
            }
            else if( currentClickedNode.data.type == "Chapter"){
                $('#showAllPagesBtn').css('opacity','0');
                $('.option-combo').css('opacity','1');
            }
            else{
                $('#showAllPagesBtn').css('opacity','0');
                $('.option-combo').css('opacity','0');
            }
        }
        $(document).trigger({
            type: "TREE_ITEM_CLICKED",
            uiData: data,
            rendererType: DynaTree.rendererType,
            nodeType: nodeType
        });
    }

    /**
     *
     * @param treeObj
     * @param data
     */
    this.createTree = function(treeObj,data){
        $(document).bind("expandParentNode", function onExpandParentNode(e){
            var pNode = searchFolderNodeWithName(e.currentId,null)
            pNode.data.products = e.productsCollection;
            if(e.callBack){
                e.callBack();
            }else{
                pNode.parent.activate();
                pNode.parent.expand();
            }
        });

        if(temp != null){
            temp.removeChildren();
            temp.addChild(data);
        }else{
            $(treeObj).dynatree({
                children : data,
                /**
                 *
                 * @param node
                 * @param span
                 */
                onCreate: function(node, span){
                    bindContextMenu(span,node.data.type);
                },
                /**
                 * On lazy read of node
                 * @param node
                 */
                onLazyRead: function(node){
                    /*alert(JSON.stringify(node.data));*/
                    var requestBody = {
                        "id":node.data.id,
                        "type":node.data.type,
                        "groupID":node.data.groupId,
                        "isLazy":true,
                        "structure":GraphicDataStore.getCurrentSchema().name,
                        "path": node.data.path
                    };

                    TreePresenter.getLazyTree(requestBody, function(data){
                        if(data && data.length > 0){
                            node.addChild(data);
                            node.data.children = data;
                        }
                        else{
                            node.childList = [];
                            node.render();
                        }
                    });

                },
                /**
                 *
                 * @param flag
                 * @param node
                 * @description called on expansion of an element in the dyna tree
                 */
                onExpand : function(flag, node){
                	console.log(flag);
                	if(!flag)
                		return;
                    if(node.data.type == "Assortment"){
                        nodeType = "Assortment";
                        GraphicDataStore.setCurrentAssortment(node.data);
                    }else{
                    }
                },
                /**
                 *
                 * @param node
                 * @description called when a node in the tree is activate i.e. clicked on
                 */
                onActivate: function(node) {
                    currentClickedNode = node;
                    if(GraphicDataStore.isAssortmentUpdated){
                        AssetTreePresenter.saveChangesOfAssortment(showCurrentActivatedNode);
                    }else{
                        showCurrentActivatedNode();
                    }
                },
                /**
                 * Drag and drop for tree
                 */
                dnd: {
                    preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                    /**
                     *
                     * @param node
                     * @returns {boolean}
                     * @description called when a drag event has started
                     */
                    onDragStart: function(node) {

                        if(node.data.type == "Chapter"||node.data.type == "Page"||node.data.type == "Assortment" ) {
                            oldParentNode = node.parent;
                            return true;
                        }
                        else{
                            return false;
                        }

                    },

                    /**
                     *
                     * @param node
                     * @param sourceNode
                     * @returns ["over"] if sourceNode datatype equals 'Assortment' and nodedatatype equals 'Page'; or node datatype equals 'Publication' or 'Chapter'
                     * else false
                     */
                    onDragEnter: function(node, sourceNode) {
                        if(sourceNode.data.type == "Assortment"){
                            if(node.data.type == "Page"){
                                return ["over"];
                            }
                        }
                        if(node.data.type == "Publication" || node.data.type == "Chapter"){
                            return ["over"];
                        }
                        else{
                            return false;
                        }
                    },

                    /**
                     *
                     * @param sourceNode
                     * @param node
                     * @param hitMode
                     * @param ui
                     * @param draggable
                     */
                    onDrop: function(sourceNode, node, hitMode, ui, draggable) {
                        draggedNode = node;
                        droppedSrcNode = sourceNode;
                        dragHitMode = hitMode;

                        var parentNode = droppedSrcNode;
                        var newChildNode = draggedNode;
                        var oldPathForChild = draggedNode.data.path;

                        newChildNode.data.path = parentNode.data.path +","+parentNode.data.id;
                        var newPathForChild   = newChildNode.data.path;
                        var flag=isFolder(draggedNode.data.type);
                        var prefix;
                         if(draggedNode.data.type == "Assortment"){
                             prefix = getUrlPrefix(draggedNode.data.type,"copy");
                             TreePresenter.dragAndDropAssortment(prefix,draggedNode.data.title,newPathForChild,onDropSuccess);
                         }else{
                             prefix =getUrlPrefix(draggedNode.data.type,"move");
                             prefix = prefix+draggedNode.data.type;
                             TreePresenter.dragAndDropDimensions(prefix,draggedNode.data.id,oldPathForChild,flag,newPathForChild,onDropSuccess);
                         }

                    }
                }
            });

            /**
             *
             * @param name
             * @param searchFrom
             * @returns {undefined} if name equals null; node object if found
             */
            function searchFolderNodeWithName(name, searchFrom) {
                if (name == null) {
                    return undefined;
                }

                if (searchFrom == null) {
                    searchFrom = $(treeObj).dynatree("getRoot");
                }

                var match = undefined;

                searchFrom.visit(function (node) {
                    if (node.data.title === name) {
                        match = node;
                        return false; // Break if found
                    }
                });
                return match;
            }
            
            temp = $(treeObj).dynatree("getRoot");
            if(pubIdToOpen){
                var manode = searchFolderNodeWithName(pubIdToOpen,null)
                manode.activate();
                manode.expand()
            }

            //$('.colmask').jqxSplitter({ width: '100%', height: 700, splitBarSize:8, panels: [{ size: '20%'}, { size: '80%'}] });
            $('.colmask').split({
                orientation: 'vertical',
                limit: 30,
                position: '20%'
            });
        }
    }

}

DynaTree.rendererType;


