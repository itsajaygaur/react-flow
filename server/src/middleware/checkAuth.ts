import jwt from 'jsonwebtoken'
import 'dotenv/config'

export async function checkAuth(req, res, next){

    try {
        
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1];
        if(!token) return res.status(401).json({success: false, message: 'Unauthorized: Token is missing'})
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode

        next()

    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }


}