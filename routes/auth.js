import {Router} from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import { generateJWTtoken } from '../sevices/token.service.js';
const router = Router() ; 


router.get('/login' , (req , res)=>{
    if (req.cookies.token) { // agar foyladanuvchi tizimga kirgan bolsa uni '/login' qismiga jonatmaydi
        res.redirect('/')     // aksincha bosh sahifaga jonatadi
        return
    }
    res.render('login',  {
        title : "Login page", 
        isLogin : true ,
        loginError : req.flash('loginError')   
    })
})

router.get('/register' , (req , res)=>{
    if (req.cookies.token) {// agar foyladanuvchi tizimga kirgan bolsa uni '/register' qismiga jonatmaydi
        res.redirect('/')    // aksincha bosh sahifaga jonatadi
        return
    }
    res.render('register' , { 
        title :"Register page" , 
        isRegister : true , 
        registerError : req.flash("registerError")
    })
})

router.get('/logout' , (req, res)=>{
    res.clearCookie('token');
    res.redirect('/')
})

router.post('/login' , async (req , res)=>{
    const {email , password} = req.body ;
    if(!email || !password) {
        req.flash('loginError' , "Maydonni to'ldiring" );
        res.redirect('/login')
        return
    }

    const existUser = await User.findOne({email}) // create qilingan  user 
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

    const token = generateJWTtoken(existUser._id); // token generate qilish ucun modelda yaratilgan id ni beramiz 
    res.cookie('token' , token , {httpOnly : true , secure : true}) 
    
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
    const user = await User.create(userData); // userga model create qiladi

    const token = generateJWTtoken(user._id); // token generate qilish ucun modelda yaratilgan id ni beramiz 
    res.cookie('token' , token , {httpOnly : true , secure : true}) // yaratilgan tokenni cookies ga saqlaymiz
    console.log(token);
   
  res.redirect('/')
})

export default router
