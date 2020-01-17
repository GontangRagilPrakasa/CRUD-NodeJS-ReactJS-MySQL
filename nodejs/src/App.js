const express = require('express');
const app = express();

//setting port
app.set('port', process.env.POST||5000);

//Middlewares
app.use(express.json());

//configurasi CROS
app.use((req,res, next) =>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//mengambil data router
const employeeRouters = require('./routes/EmployeeRoute');
//Route
app.use('/employee', employeeRouters);

app.use('/',(req,res)=>{
    res.send("hello world!!!");
});

app.use('/test', (res,req)=>{
    res.send("This is route");
});

app.listen(app.get('port'), ()=>{
    console.log("Starting server Node.js");
}); 
