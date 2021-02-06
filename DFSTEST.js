// Mock function for e2e test for DFS probe
isThermometerAttached() {
  return true;
}
isReadyToReadTemperature() {
  return true;
};
startReadingTemperaturesForWeb() {
  for (var i = 0; i < 10; i++) {
    if (i === 9) {
      probeComplete(Date.now() % 60)
    } else {
      var val = (Date.now() % 60)*(counter+1);
      sendProbeData(val)
    }
  }
};
stopReadingTemperatures() {
  return;
};

window.sendMessageToApp = (functionName) => {
  if (functionName === "isThermometerAttached") {
    response = isThermometerAttached();
  }

  if (functionName === "isReadyToReadTemperature") {
    response = isReadyToReadTemperature();
  }

  if (functionName === "startReadingTemperatures") {
    response = startReadingTemperaturesForWeb();
  }

  if (functionName === "stopReadingTemperatures") {
    response = stopReadingTemperatures();
  }

  if (functionName === "readingTemperaturesNow") {
    response = true;
  }

  if (functionName === "isAutoModeOn") {
    response = true;
  }

  return response;
}




/*
Cookies.set('foo', 'bar');
Cookies.set('ham', 'sam');
const sortObject = (o) => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
var str = 'abcdefghijkl';
var newStr = '';
var arr = str.match(/.{1,3}/g);

console.log('str, ', str);
for (var i = 0; i < arr.length; i++) {
  var key = 'idToken' + i;
  var val = arr[i];
  Cookies.set(key, val);
}
console.log('Cookies.get(), ', Cookies.get());
var c = Cookies.get();
for (var l = 0; l < Object.keys(sortObject(c)).length; l++) {
    var k = Object.keys(c)[l];
    var v = c[k];
    if(k.match('idToken')) {
        console.log(k , v);
        newStr += c[k];
    }
}
console.log('newStr , ', newStr);
*/
