import {Router} from 'express';
import Product from '../models/Product.js'
import auth from '../middleware/auth.js';
import userMiddleware from '../middleware/user.js';
const router = Router() ; 



router.get('/' , async (req , res)=>{
    const products = await Product.find().lean()   /// lean methodi baza dannix ffwefwefef malumotlarini json formatiga ogirib beradi
    res.render('index' , {
        title :"Bo$$ Shop ",
        products : products.reverse() // reverse() yangi qoshilgan narsalarni boshiga chiqaradi 
    })
    console.log(products);
})

router.get('/products' , (req , res)=>{
    res.render('products' ,{
        title : "Products" , 
        isProducts : true
    })
})


router.get('/add' , auth  , (req , res)=>{  // auth bu middleware / login qilmagan foydalanuvchiga add qilishga ruxsat bermaydi
    
    res.render('add', { 
        title : "Add" , 
        isAdd : true ,
        errorAddProduct : req.flash('errorAddProduct')
    })
})

router.post('/add-products' , userMiddleware, async (req , res )=>{
    const {title , description , image , price} = req.body;
    if(!title || !description || !image || !price) {
        req.flash('errorAddProduct', "Maydonni to'ldiring");
        res.redirect('/add');
        return
    }

    const products = await Product.create({...req.body, user : req.userId});
    res.redirect('/')
})

export default router