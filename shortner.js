var firebase = require('firebase');
var express=require('express');
const r = require('convert-radix64');
const hasha=require('hasha');

var admin = require("firebase-admin");

// Get a database reference to our blog


var config={
    apiKey: "AIzaSyAr_d7GNAodFwczQ5FP-vxUJke2QKvBowU",
    authDomain: "urlshortner-94fd6.firebaseapp.com",
    databaseURL: "https://urlshortner-94fd6.firebaseio.com",
    projectId: "urlshortner-94fd6",
    storageBucket: "urlshortner-94fd6.appspot.com",
    messagingSenderId: "277896361969",
    appId: "1:277896361969:web:8bde31cff214cb712ab650",
    measurementId: "G-YS8P6F13MS"
};

firebase.initializeApp(config);

var db = firebase.database();


var exp={
     shorten:(url)=>{
        var hash =  hasha(url, {encoding:"base64", algorithm:"md5"});
        hash = hash.slice(0,4);
        hash = hash.replace('/','-');
        hash = hash.replace('+','_');
        var short=r.from64(hash)
        db.ref('/'+short).set({
            code:hash,
            url:url
        })
        console.log(hash)
        console.log(r.from64(hash))

        return hash;
     },

     expand:(shortcode)=>{

        return new Promise((resolve,reject)=>{
            if(shortcode===undefined){
                return null;
            }
            var ref=db.ref('/'+r.from64(shortcode))
            ref.on("value", (snapshot)=>{
                if(snapshot.val()){
                    resolve(snapshot.val().url)
                }
                else{
                    reject("error occoured")
                }
              });

        })

     }
}


// exp.expand(r.from64("26Ub")).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

module.exports=exp;

