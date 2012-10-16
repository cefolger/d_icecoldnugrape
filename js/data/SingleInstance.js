define([
    'exports',
    './Producer',
    'dojo/_base/declare',
    'dojo/store/JsonRest',
    'dojo/request',
    'dojo/_base/array'
], function(exports, Producer) {
    exports.setState = function (state) {
        this._state = state;
        console.log('set state', this._state);
        console.log('Producer', Producer);
    };

    exports.getState = function () {
        console.log('get state', this._state);
        return this._state;
    };

    return exports;
});