import {Router} from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt'
const router = Router() ; 


router.get('/login' , (req , res)=>{
    res.render('login',  {
        title : "Login page", 
        isLogin : true ,
        loginError : req.flash('loginError')   
    })
})

router.get('/register' , (req , res)=>{
    res.render('register' , { 
        title :"Register page" , 
        isRegister : true , 
        registerError : req.flash("registerError")
    })
})

router.post('/login' , async (req , res)=>{
    const {email , password} = req.body ;
    if(!email || !password) {
        req.flash('loginError' , "Maydonni to'ldiring" );
        res.redirect('/login')
        return
    }

    const existUser = await User.findOne({email})
    if (!existUser) {
        req.flash('loginError' , "Bunday foydalanuvchi ro'yhatdan o'tmagan" );
        res.redirect('/login')
        return
    } 
    const isPassEqual = await bcrypt.compare(password , existUser.password) // login qilishda heshlangan va oddiy parollarni solishtirish 
    if(!isPassEqual) {
        req.flash('loginError' , "Parol xato kiritildi" );
        res.redirect('/login')
        return
    }  
    
    res.redirect('/')
})

router.post('/register', async (req , res)=>{
    const {name , phone , email , password} = req.body ;

    if(!name || !phone || !email || !password) {
        req.flash('registerError', "Maydonni to'ldiring");
        res.redirect('/register');
        return
    }
    const haveUser = await User.findOne({email})
    if (haveUser) {
        req.flash('registerError', `Bunday emaildagi foydalanuvchi ro'yhatdan o'tgan, [ ${email} ]ni o'zgartiring`);
        res.redirect('/register')
        return
    }

    const hashedPassword  = await bcrypt.hash(password , 10) // parolni hashlash 
    const userData = { name, phone, email, password : hashedPassword }
    const user = await User.create(userData);
   
  res.redirect('/')
})


export default router
