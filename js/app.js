var isLinkGridSetup = false;

var tabSelected = function() {
    if( isLinkGridSetup === false ) {
        require([
            "dojo/store/JsonRest",
            "dojo/_base/array",
            "dojox/grid/DataGrid",
            "dojo/domReady!"
        ], function( JsonRest, arrayUtil, DataGrid ) {
            var linkStore = new JsonRest({target:"json/links.json"});
            
            require([
                "dojo/store/Memory",
                "dojo/data/ObjectStore",
                "dojox/grid/DataGrid",
                "dojo/domReady!"
            ], function(Memory, ObjectStore, DataGrid){
                new DataGrid({
                    store: ObjectStore({objectStore: linkStore}),
                    structure: [
                        {name:"label", field:"label", width: "50%"},
                        {name:"value", field:"value"}
                    ],
                    autoHeight: true
                }, "firstdiv").startup();
                
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
