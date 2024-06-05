import homeRoutes from "./routes/home.route.js";

export default function mountRoutes(app) {
    app.use("/home", homeRoutes)
}