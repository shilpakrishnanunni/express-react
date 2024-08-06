import 'dotenv/config'
import cors from "cors";
import csurf from 'csurf';
import express from "express";
import morgan from "morgan";
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import { checkConnection } from "./config/db.js";
import mountRoutes from './routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // process.env.CLIENT_URL,
    // methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan('tiny'));
app.use(session({
    genid: (req) => {
        return uuidv4()
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV==="production",
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// app.use(csurf);

app.use((req, res, next) => {
    console.log(`-----${req.method} ${req.url}-----`);
    if (req.method=="GET") {
        console.log("req.query",req.query);
    } else {
        console.log("req.body",req.body);
    }
    next();
})

checkConnection();

const PORT = process.env.PORT;

app.use((req, res, next) => {
    console.log(`-----${req.method} ${req.url}-----`);
    if (req.method=="GET") {
        console.log("req.query",req.query);
    } else {
        console.log("req.body",req.body);
    }
    next();
})

mountRoutes(app);

app.get('/', (req, res)=>{
    res.status(200).send("Hello World");
});

app.get("/hello-world", (req, res) => {
    res.status(200).json({response: "hello world"})
})

app.use((err, req, res, next) => {
    console.log("From error handling middleware", err)
    if (err.code==="EBADCSRFTOKEN") { //csrf
        res.status(403).json({ message: 'Form tampered with' });
    } else {
        if (res.headersSent) {
            return next(err)
        }
        res.status(500).json({ error: err.message });
    }
})

app.use((req, res) => {
    console.log("API DOESN'T EXIST:",req.method,req.url);
    res.send(`API DOESN'T EXIST: ${req.method} ${req.url}`);
})

app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
})
.on("error", (error) => {
    console.error("ERROR ON STARTUP:", error);
})