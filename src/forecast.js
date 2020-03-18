
const request  =require('request')

const  forecast = (latitude,longitude,callback) => {
    console.log(longitude)
    const weatherUrl = 'https://api.darksky.net/forecast/cce3c288a60191473685505eafcc0624/'+latitude+','+longitude+'?units=si'
    request({url : weatherUrl , json:true},(error,response) =>{
        if(error){
            callback("Unable to Connect to Weather services",undefined)
        }
        else if (response.body.error){
            callback('Please Check the Weather Location. Missing Weather Location Or Not Found',undefined)
        }
        else{
            const data1 = response.body
            const todayforecast = (data1.daily.data)[0].summary+"It is currently "+data1.currently.temperature+" degree out. There is a "+data1.currently.precipProbability+" % chance of Precipitation."
            const temperatureHigh = [data1.daily.data[0].temperatureHigh,data1.daily.data[1].temperatureHigh,data1.daily.data[2].temperatureHigh]
            const temperatureLow = [data1.daily.data[0].temperatureLow,data1.daily.data[1].temperatureLow,data1.daily.data[2].temperatureLow]
            const forecast={
                temperatureHigh,
                temperatureLow,
                today:todayforecast
            }
            callback(undefined,forecast)
        }
    })
} 
module.exports =forecast