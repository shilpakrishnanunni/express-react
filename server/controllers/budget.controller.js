import Categories from "../models/categories.model.js";
import Users from "../models/users.model.js";


export const getBudgetDashboard = async (req, res, next) => {
    try {
        console.log("-----getBudgetDashboard----")
        const userID = 1;
        const response = {};
        const [budgetCategories, user] = await Promise.all([
            Categories.findAll({ attributes: ["id", "name", "status", "recurring"], raw:true }),
            Users.findOne({ attributes: ["budget"], where: { id: userID }, raw: true })
        ])

        response.budgetCategories = budgetCategories;
        response.budgetAmount = user.budget;
        console.log(response)
        return res.json({ response });
    } catch (error) {
        console.log("ERROR FROM getBudgetDashboard", error);
        return next(error);        
    }
};

export const addCategory = async (req, res, next) => {
    try {
        console.log(`-----${req.method} ${req.url}-----`);
        console.log(req.body)
        const { category, recurring } = req.body;
        if (!category || !recurring) return res.status(500).json("INVALID VALUES");
    
        await Categories.create({
            name: category,
            status: "0",
            recurring: req.body.recurring ? "1" : "0"
        })
        return res.status(200);
    } catch (error) {
        console.log("ERROR FROM addCategory", error);
        return next(error);
    }
};

export const selectCategory = async (req, res, next) => {
    try {
        console.log(`-----${req.method} ${req.url}-----`);
        console.log(req.body)
        const { categoryId } = req.body;
    
        await Categories.update({ status: "1" }, { where: { id: categoryId } });
        return res.status(200);
    } catch (error) {
        console.log("ERROR FROM selectCategory", error);
        return next(error);
    }
};

export const alterBudget = async (req, res, next) => {
    try {
        const userID = 1;
        await Users.update({ budget: req.body.budget }, { where: { id: userID } });
        return res.status(200);
    } catch (error) {
        logger.error("ERROR FROM alterBudget", error);
        return next(error);
    }
}