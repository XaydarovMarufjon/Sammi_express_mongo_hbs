import express from "express";
import { engine, create } from "express-handlebars";
import AuthRoutes from './routes/auth.js'
import ProductsRoutes from './routes/products.js';
import mongoose from "mongoose";
import flash from "connect-flash";
import session from "express-session";
import cookieParcer from 'cookie-parser'
import * as dotenv from 'dotenv';
// middleWare
import varMiddleware from './middleware/var.js';
import userMiddleware from "./middleware/user.js";
import hbsHelpers from './utils/index.js';

dotenv.config(); // envoirement ishlarish

const app = express();

const hbs = create({ defaultLayout: 'main', extname: 'hbs' , helpers: hbsHelpers  })   /// hbsni sozlash 

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')    /// hbsni sozlash 
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParcer())
  /// validation chiqarish uchun middlewarelar 
  app.use(flash());  
  app.use(session({secret:"Marufjon098", resave : false , saveUninitialized : false}))             
 app.use(varMiddleware)
app.use(AuthRoutes)       /// routlarni chaqirib olish uchun ishlaatiladi 
app.use(ProductsRoutes)
app.use(userMiddleware)  /// userIdni hohlagan joyda ishlatish uchun usermiddlewareni global holatga otkazdik

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
