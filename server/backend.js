var express = require('express');
var app = express();
var longpoll = require("express-longpoll")(app)
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mqtt = require('mqtt');

var data1 = 0;
var data2 = 0;
var data3 = 0;
var data4 = 0;
var light_temp1 = 0;
var light_temp2 = 0;
var light_temp3 = 0;
var light_temp4 = 0;

var ct1 = mqtt.connect('mqtt://35.234.254.79:1883');
var ct2 = mqtt.connect('mqtt://35.234.254.79:1883');
var ct3 = mqtt.connect('mqtt://35.234.254.79:1883');
var ct4 = mqtt.connect('mqtt://35.234.254.79:1883');
var ctdata1 = 'off';
var ctdata2 = 'off';
var ctdata3 = 'off';
var ctdata4 = 'off';
var light1 = mqtt.connect('mqtt://35.234.254.79:1883');
var light2 = mqtt.connect('mqtt://35.234.254.79:1883');
var light3 = mqtt.connect('mqtt://35.234.254.79:1883');
var light4 = mqtt.connect('mqtt://35.234.254.79:1883');


longpoll.create("/poll", { maxListeners: 100 });
longpoll.create("/poll2", { maxListeners: 100 });

app.put('/update1', (req, res) => {
    data1 = req.body.data;
    console.log("Light 1 "+data1);
    res.send("received data light 1");
    var data = {
        "light1" : data1,
        "light2" : data2,
        "light3" : data3,
        "light4" : data4
    }
    longpoll.publish("/poll", data);
    check1();
    console.log('checking 1');
});
light1.on("connect", function() {
    setInterval(function() {
        if(data1 != light_temp1) {
            light1.publish("street/l1", JSON.stringify(data1));
            light_temp1 = data1;
        }
    }),1000;
});
app.put('/update2', (req, res) => {
    data2 = req.body.data;
    console.log("light 2 "+data2);
    res.send("received data light 2");
    var data = {
        "light1" : data1,
        "light2" : data2,
        "light3" : data3,
        "light4" : data4
    }
    longpoll.publish("/poll", data);
    check2();
});
light2.on("connect", function() {
    setInterval(function() {
        if(data2 != light_temp2) {
            light2.publish("street/l2", JSON.stringify(data2));
            light_temp2 = data2;
        }
    }),1000;
});

app.put('/update3', (req, res) => {
    data3 = req.body.data;
    console.log("light 3 "+data3);
    res.send("received data light 3");
    var data = {
        "light1" : data1,
        "light2" : data2,
        "light3" : data3,
        "light4" : data4
    }
    longpoll.publish("/poll", data);
    check3();
});
light3.on("connect", function() {
    setInterval(function() {
        if(data3 != light_temp3) {
            light3.publish("street/l3", JSON.stringify(data3));
            light_temp3 = data3;
        }
    }),1000;
});
app.put('/update4', (req, res) => {
    data4 = req.body.data;
    console.log("light 4 "+ data4);
    res.send("received data light 4");
    var data = {
        "light1" : data1,
        "light2" : data2,
        "light3" : data3,
        "light4" : data4
    }
    longpoll.publish("/poll", data);
    check4();
});
light4.on("connect", function() {
    setInterval(function() {
        if(data4 != light_temp4) {
            light4.publish("street/l4", JSON.stringify(data4));
            light_temp4 = data4;
        }
    }),1000;
});

app.get('/intial', (req, res) => {
    var data = {
        "light1" : data1,
        "light2" : data2,
        "light3" : data3,
        "light4" : data4,
        "ct1" : ctdata1,
        "ct2" : ctdata2,
        "ct3" : ctdata3,
        "ct4" : ctdata4
    }
    res.send(data);
});

ct1.on('connect', function() {
    ct1.subscribe("street/ct1");
    console.log("subscribed to ct 1")
});
ct1.on('message', function(topic, message) {
    //console.log("CT 1 Data received : "+ message.toString());
    if(parseInt(message.toString())>=800){
        ctdata1='on';
    }
    else if(parseInt(message.toString())<800){
        ctdata1='off';
    }
});

ct2.on('connect', function() {
    ct2.subscribe("street/ct2");
    console.log("subscribed to ct 2")
});
ct2.on('message', function(topic, message) {
    //console.log("CT 2 Data received : "+ message.toString());
    if(parseInt(message.toString())>=800){
        ctdata2='on';
    }
    else if(parseInt(message.toString())<800){
        ctdata2='off';
    }
});

ct3.on('connect', function() {
    ct3.subscribe("street/ct3");
    console.log("subscribed to ct 3")
});
ct3.on('message', function(topic, message) {
    //console.log("CT 3 Data received : "+ message.toString());
    if(parseInt(message.toString())>=800){
        ctdata3='on';
    }
    else if(parseInt(message.toString())<800){
        ctdata3='off';
    }
});

ct4.on('connect', function() {
    ct4.subscribe("street/ct4");
    console.log("subscribed to ct 4")
});
ct4.on('message', function(topic, message) {
    //console.log("CT 4 Data received : "+ message.toString());
    if(parseInt(message.toString())>=800){
        ctdata4='on';
    }
    else if(parseInt(message.toString())<800){
        ctdata4='off';
    }
});
//800 cut off
var checking =false;
setInterval(() => {
    if(checking ==false){
        if(data1==1 && ctdata1=='off'){
            var data={
                "ct":'light 1 is off'
                    }
        longpoll.publish('/poll2',data)
        }
        if(data2==1 && ctdata2=='off'){
            var data={
                "ct":'light 2 is off'
                    }
        longpoll.publish('/poll2',data)
        }
        if(data3==1 && ctdata3=='off'){
            var data={
                "ct":'light 3 is off'
                    }
        longpoll.publish('/poll2',data)
        }
        if(data4==1 && ctdata4=='off'){
            var data={
                "ct":'light 4 is off'
                    }
        longpoll.publish('/poll2',data)
        }
        if(data1==0 && ctdata1=='on'){
            var data={
                 "ct":'something wrong with light 1 switch is low and current is high'
                  }
              longpoll.publish('/poll2',data)
            }
        if(data2==0 && ctdata2=='on'){
             var data={
                 "ct":'something wrong with light 2 switch is low and current is high'
                   }
             longpoll.publish('/poll2',data)
            }
        if(data3==0 && ctdata3=='on'){
            var data={
               "ct":'something wrong with light 3 switch is low and current is high'
                 }
             longpoll.publish('/poll2',data)
            }
        if(data4==0 && ctdata4=='on'){
              var data={
                "ct":'something wrong with light 4 switch is low and current is high'
                          }
             longpoll.publish('/poll2',data)
            }    
    }
}, 30000);

function check4(){
    checking= true;
    setTimeout(() => {
            var data={
                "ct4":ctdata4,
                "ct3":ctdata3,
                "ct2":ctdata2,
                "ct1":ctdata1
            }
    longpoll.publish('/poll2',data)
        checking=false;
    }, 10000);
}
function check3(){
    checking=true;
    setTimeout(() => {
            var data={
                "ct4":ctdata4,
                "ct3":ctdata3,
                "ct2":ctdata2,
                "ct1":ctdata1
        }
    longpoll.publish('/poll2',data) 
    checking=false;      
    }, 10000);
}
function check2(){
    checking=true;
    setTimeout(() => {
            var data={
                "ct4":ctdata4,
                "ct3":ctdata3,
                "ct2":ctdata2,
                "ct1":ctdata1
            }
    longpoll.publish('/poll2',data)
    checking=false;
    }, 10000);
}
function check1(){
    checking =true;
    setTimeout(() => {
        console.log('checking finished')
            var data={
                "ct4":ctdata4,
                "ct3":ctdata3,
                "ct2":ctdata2,
                "ct1":ctdata1
            }
    longpoll.publish('/poll2',data) 
    checking=false;
    }, 10000);
}

app.listen(6060, function() {
    console.log("Listening on port 6060");
});