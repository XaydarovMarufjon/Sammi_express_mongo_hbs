import express from "express";
import { engine, create } from "express-handlebars";
import AuthRoutes from './routes/auth.js'
import ProductsRoutes from './routes/products.js';
import mongoose from "mongoose";
import flash from "connect-flash";
import session from "express-session";
import * as dotenv from 'dotenv';

dotenv.config(); // envoirement ishlarish

const app = express();

const hbs = create({ defaultLayout: 'main', extname: 'hbs' })   /// hbsni sozlash 

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')    /// hbsni sozlash 
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(express.json())
  /// validation chiqarish uchun middlewarelar 
//   app.use(express.cookieParser('keyboard cat'));
//   app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());  
  app.use(session({secret:"Marufjon098", resave : false , saveUninitialized : false}))             
  
app.use(AuthRoutes)       /// routlarni chaqirib olish uchun ishlaatiladi 
app.use(ProductsRoutes)

// mongoose.set('strictQuery' , false) ;

const srartApp = () => {
    try {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

        const PORT = process.env.PORT || 4200 // process bilan ozimiz hohlagan portni berishimiz mumkin

        app.listen(PORT, () => {
            console.log(`server is running  PORT  http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}


srartApp()
