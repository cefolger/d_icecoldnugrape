define([
    'dojo/_base/declare',
    'dojo/store/JsonRest',
    'dojo/request'
], function(declare, JsonRest, request){
    var createDataRetriever = function(data) {
        return {
            rows: function() {
                return data.values;
            }
        };
    };

    return declare("data.TestData", [],{
        getData: function(callback) {
            // Request the JSON data from the server
            request.get("json/data.json", {
                // Parse data from JSON to a JavaScript object
                handleAs: "json"
            }).then(function(data){
                callback(createDataRetriever(data));
            },
            function(error){
                alert(error);
            });
        }
    });
});