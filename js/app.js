var isLinkGridSetup = false;
var isSongGridSetup = false;

var linkTabSelected = function() {
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
                }, "linkGridDiv").startup();
                
                isLinkGridSetup = true;
            });
        });
    }
};

var songTabSelected = function() {
    if( isSongGridSetup === false ) {
        require([
            "dojo/store/JsonRest",
            "dojo/_base/array",
            "dojox/grid/DataGrid",
            "dojo/domReady!"
        ], function( JsonRest, arrayUtil, DataGrid ) {
            var songStore = new JsonRest({target:"json/songs.json"});
            
            require([
                "dojo/store/Memory",
                "dojo/data/ObjectStore",
                "dojox/grid/DataGrid",
                "dojo/domReady!"
            ], function(Memory, ObjectStore, DataGrid){
                new DataGrid({
                    store: ObjectStore({objectStore: songStore}),
                    structure: [
                        {name:"label", field:"label", width: "50%"},
                        {name:"value", field:"value"}
                    ],
                    autoHeight: true
                }, "songGridDiv").startup();
                
                isSongGridSetup = true;
            });
        });
    }
};

var handleTabEvents = function() {
    require([
        "dojo/ready",
        "dojo/aspect",
        "dijit/registry",
        "dijit/layout/TabContainer",
        "dijit/layout/ContentPane"
    ], function( ready, aspect, registry ) {
        ready(function() {
            var tabContainer = registry.byId("tabcontainer");
            var linkContentPanel = registry.byId("linkcontentpanel");
            var songContentPanel = registry.byId("songcontentpanel");
            
            // http://jsfiddle.net/phusick/Mdh4w/
            // link tab selected            
            aspect.after(linkContentPanel, "_onShow", function() {
                linkTabSelected();
            });
            
            // song tab selected            
            aspect.after(songContentPanel, "_onShow", function() {
                songTabSelected();
            });
        });
    });
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
            
            handleTabEvents();
        });
    });
})();
