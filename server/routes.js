import budgetRoutes from "./routes/budget.route.js";
import homeRoutes from "./routes/home.route.js";
import publicRoutes from "./routes/public.routes.js";

export default function mountRoutes(app) {
    app.use("", publicRoutes),
    app.use("/home", homeRoutes),
    app.use("/budget", budgetRoutes)
}
