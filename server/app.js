import 'dotenv/config'
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mountRoutes from './routes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan('tiny'))

const PORT = process.env.PORT;

mountRoutes(app);


app.get('/', (req, res)=>{
    res.status(200).send("Hello World");
});

app.get("/hello-world", (req, res) => {
    res.status(200).json({response: "hello world"})
})

app.use((err, req, res, next) => {
    console.log("From error handling middleware", err)
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).json({ error: err.message });
})

app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
})
.on("error", (error) => {
    console.error("ERROR ON STARTUP:", error);
})