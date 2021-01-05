async function getCity(name){    
    var xmlHttp = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
        xmlHttp.onreadystatechange = function() {
          console.log(JSON.stringify(xmlHttp))
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status >= 300) {
                    reject("Error, status code = " + xmlHttp.status)
                } else {
                    resolve(xmlHttp.response);
                }
            }
        }
        xmlHttp.open( "GET", "http://api.openweathermap.org/data/2.5/weather?q="+name+"&APPID=6dae4f71f35c5a3ff7c8863d753dd6a6", true );
        console.log(JSON.stringify(xmlHttp))
        xmlHttp.send( null );
      });
}


export{ getCity }