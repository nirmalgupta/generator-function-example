// node --harmony test

var bluebird = require('bluebird');

var obj          = {};


var callOnlyOnce = function (key) {
  console.log('callOnlyOnce', key);
  return bluebird.delay(10000).then(function(){
    return key + ": its value";
  });
};



var synchronous = bluebird.coroutine(function* (key) {
  if (obj[key]) {
    console.log('synchronous promise present', key);
    return (yield obj[key])
  } else {
    console.log('synchronous promise craete', key);
    var value = callOnlyOnce(key);
    obj[key]  = value;
    return (yield value);
  }
});

var test = function (){
  for(var i = 0; i < 20; i++){
    callAsync(i);
  }
};

function callAsync(num){
  setTimeout(function(){
    synchronous(num % 4).then(function(value){
      console.log('callAsync ', num , ':',  value);
    }, 10)
  })
}

test();