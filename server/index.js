import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import cors from 'cors';
const port = process.env.port || 5000;
const hostname = 'http://127.0.0.1:'
import dotenv from 'dotenv'
import connectdb from './utils/db.js';



dotenv.config({})

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,

}
app.use(cors(corsOptions));


import path from 'path';
app.use('/dashboard/showallclass/uploads', express.static(path.resolve('uploads')));



app.get('/', (req, res) => {
    res.send('Hello World!')
})


//api
import userRouter from './router/user/user.router.js'
import courseRouter from './router/course/course.route.js'
import classandassigmentRouter from './router/classandassigment/classandassigment.route.js'
import certificateRouter from './model/certificate/Certificate.route.js'

//route
app.use("/user", userRouter)
app.use("/course", courseRouter)
app.use("/api", classandassigmentRouter)
app.use("/api/certificate", certificateRouter)


app.listen(port, () => {
    connectdb()
    console.log(`${hostname}${port}`)
})