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
    "store/CustomStore",
    "dojo/store/Observable",
    "dgrid/Selection",
    "dojo/domReady!"
], function(declare, Grid, Memory, ObjectStore, DataGrid, Cache, domAttr, domConstruct, ProgressBar, CustomStore, Observable, Selection){
    return declare("view.GridView", [],{
        render: function(context) {
            var testStore = Observable(CustomStore({target:"json/test.json",idProperty: "label"}));

            var MyGrid = declare([Grid, Selection], {
                renderRow: function(object, options) {
                    console.log(arguments);

                    return this.inherited(arguments);
                }
            });

            var grid = new MyGrid({
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
                            return domConstruct.toDom('<div>' + object[0][1] + '</div>');
/*
                            if(object.styling) {
                                domAttr.set(node, 'style', object.styling);
                            }

                            if(object.optional && object.optional.type && object.optional.type === 'indicator') {
                                var myProgressBar = new ProgressBar({
                                    style: "width: 300px"
                                }).placeAt(node);

                                myProgressBar.set("value", object.optional.value % 100);
                            }*/
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