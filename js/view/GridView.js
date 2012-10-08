define([
    'dojo/_base/declare',
    "dgrid/OnDemandGrid",
    "dojo/store/Memory",
    "dojo/data/ObjectStore",
    "dojox/grid/DataGrid",
    "dojo/store/Cache",
    "dojo/dom-attr",
    "dojo/dom-construct",
    "dijit/ProgressBar",
    "dojo/store/JsonRest",
    "dojo/store/Observable",
    "dojo/domReady!"
], function(declare, Grid, Memory, ObjectStore, DataGrid, Cache, domAttr, domConstruct, ProgressBar, JsonRest, Observable){
    return declare("view.GridView", [],{
        render: function(context) {
            var linkStore = new JsonRest({target:"json/links.json"});

            var testStore = Observable(JsonRest({target:"json/links.json",idProperty: "label"}));

            var grid = new Grid({
                columns: [
                    {
                        label: "The Label",
                        field: "label",
                        formatter: function(value) {
                            return '<b>' + value + '</b>';
                        }
                    },
                    {
                        label: "The value",
                        field: "value",
                        renderCell: function(object, value, node, options) {
                            if(object.styling) {
                                domAttr.set(node, 'style', object.styling);
                            }

                            if(object.optional && object.optional.type && object.optional.type === 'indicator') {
                                var myProgressBar = new ProgressBar({
                                    style: "width: 300px"
                                }).placeAt(node);

                                myProgressBar.set("value", object.optional.value % 100);
                            }
                        }
                    }
                ],
                store: testStore
            }, context);

            grid.set('sort', 'label', true);
            isLinkGridSetup = true;
        }
    });
});