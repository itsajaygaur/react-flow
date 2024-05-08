import express from 'express'
import router from './routes'
import connectDB from "@/config/db";
import cors from 'cors'
import 'dotenv/config'

const PORT =  process.env.PORT || 8000 
const app = express()




// middleware
app.use(express.json())
app.use(cors())
app.use('/api/v1/', router)

//route
app.get('/', (req, res) => res.json({message: 'Hello World'}))


//connect to MongoDB database and then start server
connectDB().then(() => app.listen(PORT, () => console.log(`server is listening on port ${PORT}`)))

