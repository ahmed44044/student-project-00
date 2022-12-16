import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import dotenv from 'dotenv'
import cors from'cors'

//set directory dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({path:path.join(__dirname,'./config/.env')})
import * as indexRouter from './src/modules/index.router.js'
import connectDB from './DB/connection.js'
import { globalErrorHandling } from './src/services/errorHandling.js'
import morgan from 'morgan'
const app = express()
//setup port and the baseUrl
const port = process.env.PORT || 5000
const baseUrl=process.env.BASEURL
app.use(cors())
//convert Buffer Date
app.use(express.json())

if (process.env.MOOD==="DEV") {
    app.use(morgan("short"))
} else {
    app.use(morgan("combined"))
}

// app.use(morgan("common")) return time and method & url & status code
// app.use(morgan("short"))  return  method & url & status code time size
//setup API Routing
app.use(`${baseUrl}/auth`,indexRouter.authRouter)
app.use(`${baseUrl}/user`,indexRouter.userRouter)
app.use(`${baseUrl}/course`,indexRouter.courseRouter)
app.use(`${baseUrl}/admin`,indexRouter.adminRouter)

app.get('/',(req,res,next)=>{
    res.json({message:"hello"})
})

app.use('*', (req, res,next) =>{
    res.send('In-valid Routing Plz check url  or  method')})
    app.use(globalErrorHandling)
    connectDB()


app.listen(port, () => console.log(`Example app listening on port ${port}!`))