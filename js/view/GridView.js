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

            var renderCell = function(index) {
                return function(object, value, node, options) {
                    return domConstruct.toDom('<div>' + object[index][1] + '</div>');
                };
            }

            var grid = new MyGrid({
                columns: [
                    {
                        label: "The Label",
                        field: "label",
                        renderCell: renderCell(0)
                    },
                    {
                        label: "The value",
                        field: "value",
                        renderCell: renderCell(1)
                    }
                ],
                store: testStore
            }, context);

            grid.set('sort', 'label', true);
            isLinkGridSetup = true;
        }
    });
});