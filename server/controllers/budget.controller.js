import Categories from "../models/categories.model.js";
import Users from "../models/users.model.js";


export const getBudgetDashboard = async (req, res, next) => {
    try {
        console.log("-----getBudgetDashboard----")
        const userID = 1;
        const response = {};
        const [budgetCategories, user] = await Promise.all([
            Categories.findAll({ attributes: ["id", "name", "recurring"], where: { status: "1" }, raw:true }),
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
        console.log("----/add-category----")
        console.log(req.body)
        const { category, recurring } = req.body;
        if (!category || !recurring) return res.status(500).json("INVALID VALUES");
    
        await Categories.create({
            name: category,
            recurring: req.body.recurring ? "1" : "0"
        })
        return res.status(200);
    } catch (error) {
        console.log("ERROR FROM addCategory", error);
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