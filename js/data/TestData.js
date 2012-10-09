define([
    'dojo/_base/declare',
    'dojo/store/JsonRest',
    'dojo/request'
], function(declare, JsonRest, request){
    return declare("data.TestData", [],{
        getData: function() {
            // Request the JSON data from the server
            request.get("json/data.json", {
                // Parse data from JSON to a JavaScript object
                handleAs: "json"
            }).then(function(data){
                console.log(data);
            },
            function(error){
                alert(error);
            });
        }
    });
});