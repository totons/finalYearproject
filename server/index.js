import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import cors from 'cors';
const port = process.env.PORT || process.env.port || 5000;
const hostname = 'http://127.0.0.1:'
import dotenv from 'dotenv'
import connectdb from './utils/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') })

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,

}
app.use(cors(corsOptions));

app.use('/dashboard/showallclass/uploads', express.static(path.join(__dirname, 'uploads')));



app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(express.static(path.join(__dirname, 'public')));

//api
import userRouter from './router/user/user.router.js'
import courseRouter from './router/course/course.route.js'
import classandassigmentRouter from './router/classandassigment/classandassigment.route.js'
import certificateRouter from './model/certificate/Certificate.route.js'


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//route
app.use("/user", userRouter)
app.use("/course", courseRouter)
app.use("/api", classandassigmentRouter)
app.use("/api/certificate", certificateRouter)


app.listen(port, () => {
    connectdb()
    console.log(`${hostname}${port}`)
})
