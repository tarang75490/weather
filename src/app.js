const express = require('express')
const path= require('path')
const hbs = require('hbs')
console.log(path.join(__dirname,'../public'))
console.log(__filename)

// path for express config
const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

const app = express()


// set handlebar engines and  viewlocation
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)



// setup to serve static files
app.use(express.static(publicDirectory))

const geocode = require('./geocode.js')
const forecast = require('./forecast.js')




// dyanmic pages
app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        name:'Tarang Khetan'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About',
        name:'Tarang'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help',
        name:'Tarang Khetan'
    })
})


app.get('/help/*',(req,res) => {
    res.render('error',{
        content:"Help Artical Not Found",
        title :"Error",
        name:'Tarang Khetan'
    })
})


// static page
app.get('/weather',(req,res) =>{
    //res.send('Weather Page')
    if ( !req.query.location ){
        return res.send({error:"Location not found"})
    }
    geocode(req.query.location,(error,{Longitude,Latitude,Place}={})=>{
        if (error){
            return res.send({error})
        }
        else{
            forecast(Latitude,Longitude,(error,data)=>{
                if(error){
                    return  res.send({error})
                }
                else{
                    res.send(
                    {
                        Location:Place,
                        Forecast:data
                    })
                }
            })
        }
    })
    
})


app.get('/*',(req,res) => {
    res.render('error',{
        content:"My 404 Page",
        title :"Error",
        name:'Tarang Khetan'
    })
})





app.listen(3000,()=>{
    console.log('Port 3000 is ready to be executed')
})
