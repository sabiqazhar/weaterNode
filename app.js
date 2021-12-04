const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/", (req, res)=>{
    const query = req.body.cityName;
    const apiKey = "8342fa2208c8729ab1fcc6c64d031c01";
    const unit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+ apiKey +'&units='+unit;
    https.get(url, (respon)=>{
        console.log(respon.statusCode);
        respon.on("data", (data)=>{
            const weaterData = JSON.parse(data); //change hexa,string, or whtever it is to json
            const temp = weaterData.main.temp; //pick some object from JSON
            const desc = weaterData.weather[0].description;
            const icon = weaterData.weather[0].icon;
            const imgUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`
            res.write(`<p>The weater is currently is ${desc}</p>`);
            res.write(`<h1>The temperature in ${query} is ${temp} degrees celcius</h1>`);
            res.write(`<img src=${imgUrl}>`);
            res.send();
        });
    });
});




app.listen(3000, ()=> console.log("server has running on port 3000"));