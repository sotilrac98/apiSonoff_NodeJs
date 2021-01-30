'use sctrict'
const express = require('express');
const ewelink = require('ewelink-api');
const app = express();

app.get('/', (req, res) => {
    res.send('API SONOFF :D')
})

app.get('/status/:parameter',(req, res) => {
    console.log(req.params)
    let param = req.params.parameter
    res.send('The Status is ' + param)
})

app.get('/estado/:correo/:pass/:id/:status1',async (req, res) => {
    let correo = req.params.correo
    let pass = req.params.pass
    let id = req.params.id
    let status1 = req.params.status1       
    
      
    
    try{
        const connection = new ewelink({
            email: correo,
            password: pass,
            region: 'us',
        }); 

        const status = await connection.setDevicePowerState(id, status1);
        let status2 = status
        res.send(status2);
        //console.log(status2)
    }catch (err) {
        // handle errors here
    }   
    
    
})

app.get('/dispositivos/:correo/:pass' , async (req,res) => {
    let correo = req.params.correo
    let pass = req.params.pass

    try{
        const connection = new ewelink({
            email: correo,
            password: pass,
            region: 'us',
        });
        const devices = await connection.getDevices();
        let dispo = devices
        res.send(dispo)
        //console.log(dispo)
    }catch (err) {
        // handle errors here
    }   
    
    
})


app.listen(3000,() => {

});

