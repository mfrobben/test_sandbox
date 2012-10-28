/*jshint asi: true globalstrict: true*/
"use strict";
/**
 * 507 backend service
 * Coded by Developer Hive at Terrarium Inc.
 * Copyright (c) 2012 Terrarium Inc.
 */

var async = require('async'),
    mongo = require('mongodb'),
    mongoose = require('mongoose'),
    util = require('util'),
    Schema = mongoose.Schema


var Foo = new Schema({
})

var FooModel = mongoose.model('Foo', Foo)


var db = null,
    collection = null

var settings = {
    uri: 'mongodb://localhost/testdb',
    name: 'testdb',
    host: 'localhost'
}

async.series({
    mongoConnect: function(callback) {
        mongoose.connect(settings.uri, function(err) {
            mongo.connect(settings.uri, {db:{safe:true}}, function(err, connectedDb) {
                db = connectedDb
                callback(err, connectedDb)
            })
        })
    },
    createCollection: function(callback){
        db.createCollection("test", function(err, coll){
            collection = coll
            callback()
        });
    },
    testFooInsert: function(callback){
        var badfood = new FooModel()
        //var badfood = new ObjectID()
        console.log(util.inspect(badfood, true, null, true));
        debugger;
        collection.insert(badfood, callback)
    }
}, function(err) {
    console.log(err)
    console.log('exiting')
})