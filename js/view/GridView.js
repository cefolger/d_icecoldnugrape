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
            var testStore = new Observable(new CustomStore({target:"json/rows.json",idProperty: "label"}));

            var MyGrid = declare([Grid, Selection], {
                renderRow: function(object, options) {
                    return this.inherited(arguments);
                }
            });

            var renderCell = function(index) {
                return function(object, value, node, options) {
                    var currentValue = object[index];

                    var d_element = domConstruct.toDom('<div>' + currentValue[1] + '</div>');
                    domAttr.set(d_element, 'style', currentValue[2]);

                    if(currentValue[3] && currentValue[3].type === 'indicator') {
                        d_element.innerHTML = '';
                        var d_progressBar = new ProgressBar({
                            style: "width: 300px"
                        }).placeAt(d_element);

                        d_progressBar.set('value', currentValue[3].value);
                    }

                    return d_element;
                };
            };

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
        }
    });
});