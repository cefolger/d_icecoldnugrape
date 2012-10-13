define([
    'dojo/_base/declare',
    './SingleInstance'
], function(declare, instance){
    return declare("data.Producer", [],{
        test: function() {
            instance.setState('hello from producer');
        }
    });
});