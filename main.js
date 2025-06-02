const express=require('express');
const app=express();

const PORT=3000;

app.use(express.json());
 
app.use('/api',require('./controller/AddItems'));
app.use('/api',require('./controller/AllMarketPlaceItems'));
app.use('/api',require('./controller/sendRequest'));

 app.listen(PORT,()=>{
    console.log("Server is running on port 3000");
 })