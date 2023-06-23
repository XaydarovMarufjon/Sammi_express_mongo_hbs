import express from "express";
import {engine , create} from "express-handlebars";
import AuthRoutes from './routes/auth.js'
import ProductsRoutes from './routes/products.js';
import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config(); // envoirement ishlarish

const app = express();

const hbs = create({defaultLayout: 'main', extname:'hbs'})   /// hbsni sozlash 

app.engine('hbs', hbs.engine )
app.set('view engine' , 'hbs')    /// hbsni sozlash 
app.set('views' , './views')

app.use(express.urlencoded({extended : true}))
app.use(express.static('public'));
app.use(express.json())

app.use(AuthRoutes)       /// routlarni chaqirib olish uchun ishlaatiladi 
app.use(ProductsRoutes)

// mongoose.set('strictQuery' , false)
mongoose.connect(process.env.MONGO_URI , { useNewUrlParser: true})

const PORT = process.env.PORT || 4200 // process bilan ozimiz hohlagan portni berishimiz mumkin

app.listen(PORT , ()=>{
    console.log( `server is running  PORT  http://localhost:${PORT}`);
})

