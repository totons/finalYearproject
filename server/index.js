// // import express from 'express';
// // const app = express();
// // import cookieParser from 'cookie-parser';
// // import cors from 'cors';
// // const port = process.env.PORT || process.env.port || 5000;
// // const hostname = 'http://127.0.0.1:'
// // import dotenv from 'dotenv'
// // import connectdb from './utils/db.js';
// // import path from 'path';
// // import { fileURLToPath } from 'url';

// // import swaggerJsdoc from "swagger-jsdoc";
// // import swaggerUi from "swagger-ui-express";
// // import swaggerSpec from "./utils/swagger.js";
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // dotenv.config({ path: path.join(__dirname, '.env') })

// // //middleware
// // app.use(express.json())
// // app.use(express.urlencoded({ extended: true }))
// // app.use(cookieParser())
// // const corsOptions = {
// //     origin: 'https://onlinelearningandassigmentsystem.vercel.app',
// //     credentials: true,

// // }
// // app.use(cors(corsOptions));

// // app.use('/dashboard/showallclass/uploads', express.static(path.join(__dirname, 'uploads')));



// // app.get('/', (req, res) => {
// //     res.send('Hello World!')
// // })
// // app.use(express.static(path.join(__dirname, 'public')));

// // //api
// // import userRouter from './router/user/user.router.js'
// // import courseRouter from './router/course/course.route.js'
// // import classandassigmentRouter from './router/classandassigment/classandassigment.route.js'
// // import certificateRouter from './model/certificate/Certificate.route.js'


// // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// // //route
// // app.use("/user", userRouter)
// // app.use("/course", courseRouter)
// // app.use("/api", classandassigmentRouter)
// // app.use("/api/certificate", certificateRouter)


// // app.listen(port, () => {
// //     connectdb()
// //     console.log(`${hostname}${port}`)
// // })





// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// import connectdb from "./utils/db.js";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./utils/swagger.js";

// import userRouter from "./router/user/user.router.js";
// import courseRouter from "./router/course/course.route.js";
// import classandassigmentRouter from "./router/classandassigment/classandassigment.route.js";
// import certificateRouter from "./model/certificate/Certificate.route.js";

// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.join(__dirname, ".env") });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// const corsOptions = {
//   origin: [
//     "https://onlinelearningandassigmentsystem.vercel.app",
//     "http://localhost:5173",
//   ],
//   credentials: true,
// };

// app.use(cors(corsOptions));

// app.use(
//   "/dashboard/showallclass/uploads",
//   express.static(path.join(__dirname, "uploads"))
// );

// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use("/user", userRouter);
// app.use("/course", courseRouter);
// app.use("/api", classandassigmentRouter);
// app.use("/api/certificate", certificateRouter);

// await connectdb();

// if (process.env.NODE_ENV !== "production") {
//   const port = process.env.PORT || 5000;

//   app.listen(port, () => {
//     console.log(`http://127.0.0.1:${port}`);
//   });
// }

// export default app;
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectdb from "./utils/db.js";
import swaggerSpec from "./utils/swagger.js";

import userRouter from "./router/user/user.router.js";
import courseRouter from "./router/course/course.route.js";
import classandassigmentRouter from "./router/classandassigment/classandassigment.route.js";
import certificateRouter from "./model/certificate/Certificate.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [
    "https://onlinelearningandassigmentsystem.vercel.app",
    "http://localhost:5173",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  "/dashboard/showallclass/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Swagger JSON
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Vercel compatible Swagger UI
app.get("/api-docs", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Online Learning & Assignment Submission System API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>
    body {
      margin: 0;
      background: #fafafa;
    }
    .topbar {
      display: none;
    }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>

  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>

  <script>
    window.onload = function () {
      window.ui = SwaggerUIBundle({
        url: "/api-docs.json",
        dom_id: "#swagger-ui",
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout",
        deepLinking: true,
        persistAuthorization: true,
      });
    };
  </script>
</body>
</html>
  `);
});

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/api", classandassigmentRouter);
app.use("/api/certificate", certificateRouter);

await connectdb();

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
  });
}

export default app;