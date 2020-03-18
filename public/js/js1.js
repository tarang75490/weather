

const weatherform =document.querySelector('form')
const Searchbut = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const message3 = document.querySelector('#day1')
const message4 = document.querySelector('#day2')
const message5 = document.querySelector('#day3')
const button = document.querySelector('#current')

button.addEventListener('click',(e)=>{
    e.preventDefault()
    if(!navigator.geolocation){
        return alert('Geolocation is provided by browser find the temp manually')
    }
    message1.textContent = 'Loading ......'
    message2.textContent = ''
    message3.textContent=  ''
    message4.textContent=  ''
    message5.textContent=  ''
    navigator.geolocation.getCurrentPosition((position)=>{
        const location= {
                   longitude : position.coords.longitude,
                   latitude : position.coords.latitude
                }




                $.ajax({
                    url:'/current-weather?longitude='+location.longitude+'&latitude='+location.latitude,
                    method:'GET',
                    dataType:'json',
                    success:function(data1){
                        console.log(data1)
                        message1.textContent =''
                        message2.textContent = 'Forecast :'+ data1.Forecast.today
                        message3.textContent = "Low      High "
                        message4.textContent = "Tomorrow's :  " + data1.Forecast.temperatureHigh[1]+'                 ' + data1.Forecast.temperatureLow[1]
                        message3.textContent = "Day After Tomorrow :  " + data1.Forecast.temperatureHigh[2]+'               '+ data1.Forecast.temperatureLow[2] 
                    },
                    error:function(error){
                        message1.textContent =error.responseText
                        
                    }
        
                })
      
        })
        





    })  
weatherform.addEventListener("submit",(e)=>{
    e.preventDefault()
    
    message1.textContent = 'Loading ......'
    message2.textContent = ''
    message3.textContent=  ''
    message4.textContent=  ''
    message5.textContent=  ''



    const location = Searchbut.value
    fetch('/weather?location='+location).then((response) =>{
    response.json().then((data1) =>{

            if(data1.error){
                // console.log(data1.error)
                 message1.textContent = data1.error
            }
            else{
                console.log(data1.Forecast)
                message1.textContent = 'Location :'+ data1.Location
                message2.textContent = 'Forecast :'+ data1.Forecast.today
                message3.textContent = "Low      High "
                message4.textContent = "Tomorrow's :  " + data1.Forecast.temperatureHigh[1]+'                 ' + data1.Forecast.temperatureLow[1]
                message3.textContent = "Day After Tomorrow :  " + data1.Forecast.temperatureHigh[2]+'               '+ data1.Forecast.temperatureLow[2]    
            }
    })
})
})