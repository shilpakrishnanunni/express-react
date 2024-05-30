import 'dotenv/config'
import express from "express";

const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res)=>{ 
    res.status(200).send("Hello World");
});

app.use((err, req, res, next) => {
    console.log("From error handling middleware", err)
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).render("error", {error: err});
})

app.listen(PORT, () => {
    console.log(`Server running successfully on port ${PORT}`);
})
.on("error", (error) => {
    console.error("ERROR ON STARTUP:", error);
})