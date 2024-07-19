import homeRoutes from "./routes/home.route.js";
import budgetRoutes from "./routes/budget.route.js";

export default function mountRoutes(app) {
    app.use("/home", homeRoutes),
    app.use("/budget", budgetRoutes)
}
