import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function register(req, res){
    try {
        const {username, password} = req.body

        if(!username || !password) return res.status(201).json({success: false, message: 'Provide username and password!'})


        const result = await User.findOne({username})

        if(result) return res.status(202).json({success: false, message: 'User already exists!'})

        const hashedPassword = bcrypt.hashSync(password, 10)

        const createUser = await User.create({username, password: hashedPassword})

        if(!createUser) return res.status(202).json({success: false, message: 'Failed to create user'})

        return res.status(200).json({success: true, message: 'User created successfully'})
        
        // const token = jwt.sign({username}, process.env.JWT_SECRET)


    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

export async function login(req, res){
    try {
        const {username, password} = req.body

        if(!username || !password) return res.status(201).json({success: false, message: 'Provide username and password!'})

        const user = await User.findOne({username})

        if(!user) return res.status(202).json({success: false, message: 'User does not exists!'})

        const isValidPassword = bcrypt.compareSync(password, user.password)
            
        if(!isValidPassword) return res.status(202).json({success: false, message: 'Incorrect password!'})
        
        const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '24h'})

        return res.status(200).json({success: true, token})
        
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}