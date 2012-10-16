define([
    'dojo/_base/declare',
    './SingleInstance'
], function(declare, instance){
    return declare("data.Producer", [],{
        test: function() {
            console.log('instance', instance);
            instance.setState('hello from producer');
        }
    });
});