export default function (req , res , next) {
   const isAuth =  req.cookies.token ? true : false  // token bormi yoqmi aniqlab beradi 
   res.locals.token = isAuth;   // global ozgaruvchi bolib bu log out chiqish yoki chiqmasligini taminlaydi 
   next()  // bu bu funksiyadan keyingi narsalarni ishga tushirib yuboradi 
}