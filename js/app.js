var isLinkGridSetup = false;

var tabSelected = function() {
    if( isLinkGridSetup === false ) {
        require([
            "view/GridView"
        ], function( GridView) {
            var gridView = new view.GridView();
            gridView.render('firstdiv');
        });
    }
};

var handleTabEvents = function() {
    require([
        "dojo/ready",
        "dojo/aspect",
        "dijit/registry",
        "dijit/layout/TabContainer",
        "dijit/layout/ContentPane",
        "view/ChartView"
    ], function( ready, aspect, registry , ChartView) {
        ready(function() {
            var linkContentPanel = registry.byId("linkcontentpanel");
            var songContentPanel = registry.byId("songcontentpanel");

            // http://jsfiddle.net/phusick/Mdh4w/
            // link tab selected
            aspect.after(linkContentPanel, "_onShow", function() {
                var test = new view.ChartView();
                test.test();
            });

            // song tab selected
            aspect.after(songContentPanel, "_onShow", function() {
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
            
            tabSelected();

            handleTabEvents();
        });
    });
})();
