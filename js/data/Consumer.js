define([
    'dojo/_base/declare',
    './SingleInstance'
], function(declare, instance){
    return declare("data.Consumer", [],{
        test: function() {
            return instance.getState();
        }
    });
});