const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');

const app= express();
const port = process.env.PORT || 5000;
app.use(cors());

app.get('/restaurant',(req,res)=>{
    const { lat, lng } = req.query;
    console.log(req.query);

    const url = `http://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

    //https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&page_type=DESKTOP_WEB_LISTING

    fetch(url,{
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edg/91.0.864.59'
    
        }
    }).then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        res.json(data);
    }).catch(error =>{
        console.log(error);
        res.status(500).send('An error occured');
    });
});

app.get('/menu',(req,res)=>{
    const { lat, lng, restaurantId } = req.query;
    console.log(req.query);

    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&submitAction=ENTER`;

    //https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5204303&lng=73.8567437&restaurantId=200193&submitAction=ENTER

    fetch(url,{
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edg/91.0.864.59'
    
        }
    }).then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        res.json(data);
    }).catch(error =>{
        console.log(error);
        res.status(500).send('An error occured');
    });
});

app.get('/', (req, res) =>{
    res.send("Welcome to the world of Food Junction Application !!!");
})

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
  
