var isLinkGridSetup = false;

var tabSelected = function() {
    if( isLinkGridSetup === false ) {
        require([
            "dojo/store/JsonRest",
            "dojo/_base/array",
            "dojox/grid/DataGrid",
            "dojo/store/Observable",
            "dojo/domReady!"
        ], function( JsonRest, arrayUtil, DataGrid, Observable ) {
            var linkStore = new JsonRest({target:"json/links.json"});

            require([
                "dgrid/OnDemandGrid",
                "dojo/store/Memory",
                "dojo/data/ObjectStore",
                "dojox/grid/DataGrid",
                "dojo/store/Cache",
                "dojo/dom-attr",
                "dojo/dom-construct",
                "dijit/ProgressBar",
                "dojo/domReady!"
            ], function(Grid, Memory, ObjectStore, DataGrid, Cache, domAttr, domConstruct, ProgressBar){

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
                }, "firstdiv");

                grid.set('sort', 'label', true);
                isLinkGridSetup = true;
            });
        });
    }
};

// start here
(function() {
    require([
        "dojo/parser", 
        "dojo/ready", 
        "dijit/layout/BorderContainer", 
        "dijit/layout/ContentPane", 
        "dijit/layout/TabContainer"
    ], function( parser, ready ) {
        ready(function() {
            parser.parse();
            
            tabSelected();
        });
    });
})();
