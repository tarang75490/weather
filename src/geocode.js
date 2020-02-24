const request = require('request')

const geocode = (address,callback) => {
    const geocodeUrl ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGFyYW5nMTIzIiwiYSI6ImNrNmdlOTM1bTBsa3Ezbm1scmF2Zmprbm4ifQ.FjJ7cMii4R5k6j6Y21ywiA'
    request({ url:geocodeUrl , json:true },(error,response) => {
        if(error){
            callback("Unable to Connect to Location services",undefined)
        }else if(response.body.features.length == 0){
            callback("Location Not Found.Try Again",undefined)
        }
        else{
            const data2 = response.body.features[0]
            const location = "Latitude and Longitude of the "+data2.place_name+" is "+data2.center[1]+" and "+data2.center[0]+" respectively."
            console.log(location)
            
            const data = {
                Longitude:data2.center[0],
                Latitude:data2.center[1],
                Place:data2.place_name
            }
            callback(undefined,data)

        } 

    })
}

module.exports = geocode


