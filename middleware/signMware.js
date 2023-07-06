export default function (req , res , next) {
    if (req.cookies.token) {
        res.redirect('/')
        return
    }
    next()
}
 // agar foyladanuvchi tizimga kirgan bolsa uni '/register' yoki '/login' qismiga jonatmaydi
 // aksincha bosh sahifaga jonatadi