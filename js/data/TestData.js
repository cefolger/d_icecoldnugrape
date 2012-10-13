define([
    'dojo/_base/declare',
    'dojo/store/JsonRest',
    'dojo/request',
    'dojo/_base/array'
], function(declare, JsonRest, request, array){
    var createDataRetriever = function(data) {
        // map columns to properly formatted values
        var mappedColumns = array.map(data.columns, function(column) {
            return {
                label: column[1],
                field: column[0]
            };
        });

        return {
            rows: function() {
                return data.values;
            },
            columns: function() {
                return mappedColumns;
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