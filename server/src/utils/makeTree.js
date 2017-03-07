// This function recieves flat tree as argument and
// creates a json object tree with all the parents and children
"use strict";
exports.__esModule = true;
/** Single tree node object is:
   {
        _id: '',
        postId: '',
        parentId: '',
        authorName: '',
        content: '',
        dateAdded: '',
        children: [ here will go all the children of the same type as parent object]
   }
**/
var makeTree = function (flat_tree) {
    var nodes = [];
    var completeTree = [];
    var lookupList = {};
    for (var i = 0; i < flat_tree.length; i++) {
        var tmpNode = {
            _id: flat_tree[i]._id,
            postId: flat_tree[i].postId,
            parentId: flat_tree[i].parentId,
            authorName: flat_tree[i].authorName,
            content: flat_tree[i].content,
            dateAdded: flat_tree[i].dateAdded,
            children: []
        };
        lookupList[tmpNode._id] = tmpNode;
        nodes.push(tmpNode);
        if (tmpNode.parentId === null || tmpNode.parentId === '') {
            completeTree.push(tmpNode);
        }
    }
    for (var i = 0; i < nodes.length; i++) {
        var tmpNode = nodes[i];
        if ((tmpNode.parentId !== null) && (tmpNode.parentId !== '')) {
            lookupList[tmpNode.parentId].children = lookupList[tmpNode.parentId].children.concat([tmpNode]);
        }
    }
    return completeTree;
};
exports["default"] = makeTree;
