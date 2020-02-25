

const weatherform =document.querySelector('form')
const Searchbut = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherform.addEventListener("submit",(e)=>{
    e.preventDefault()
    
    message1.textContent = 'Loading ......'
    message2.textContent = ''


    const location = Searchbut.value
    fetch('http://localhost:3000/weather?location='+location).then((response) =>{
    response.json().then((data1) =>{

            if(data1.error){
                // console.log(data1.error)
                 message1.textContent = data1.error
            }
            else{
                console.log(data1.Forecast)
                message1.textContent = 'Location :'+data1.Location
                message2.textContent = 'Forecast :'+data1.Forecast
            }
    })
})
})