import Categories from "../models/categories.model.js";


export const getBudgetDashboard = async (req, res, next) => {
    try {
        console.log("-----getBudgetDashboard----")
        return res.json("IN PROGRESS")
    } catch (error) {
        console.log("ERROR FROM ", error);
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

