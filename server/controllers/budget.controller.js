import Categories from "../models/categories.model.js";
import Users from "../models/users.model.js";


export const getBudgetDashboard = async (req, res, next) => {
    try {
        const userID = 1;
        const response = {};
        const [budgetCategories, user] = await Promise.all([
            Categories.findAll({ attributes: ["id", "name", "status", "recurring"], raw:true }),
            Users.findOne({ attributes: ["budget"], where: { id: userID }, raw: true })
        ]);
        response.budgetAmount = user.budget;
        
        let dropdownCategories; let listCategories;
        if (budgetCategories.length==0) {
            dropdownCategories = { value: "", label: "No Categories" };
            listCategories = {};
            return res.json({ budgetAmount: user.budget, budgetCategories: { dropdownCategories, listCategories } });
        }

        dropdownCategories = budgetCategories.filter((category) => category.status == '0').map (row => ({ value: row.id, label: row.name }));
        dropdownCategories.push({ value: '', label: 'SELECT CATEGORY' });
        listCategories = budgetCategories.filter((category) => category.status == '1');
        
        return res.json({ budgetAmount: user.budget, budgetCategories: { dropdownCategories, listCategories } });
    } catch (error) {
        console.log("ERROR FROM getBudgetDashboard", error);
        return next(error);        
    }
};

export const addCategory = async (req, res, next) => {
    try {
        const { category, recurring } = req.body;
        if (!category || !recurring) return res.status(500).json("INVALID VALUES");
    
        await Categories.create({
            name: category,
            status: "0",
            recurring: req.body.recurring ? "1" : "0"
        })
        return res.status(200).json({ success: true });
    } catch (error) {
        console.log("ERROR FROM addCategory", error);
        return next(error);
    }
};

export const selectCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.body;
    
        await Categories.update({ status: "1" }, { where: { id: categoryId } });
        return res.status(200).json({ success: true });
    } catch (error) {
        console.log("ERROR FROM selectCategory", error);
        return next(error);
    }
};

export const alterBudget = async (req, res, next) => {
    try {
        const userID = 1;
        await Users.update({ budget: req.body.budget }, { where: { id: userID } });
        return res.status(200).json({ success: true });
    } catch (error) {
        logger.error("ERROR FROM alterBudget", error);
        return next(error);
    }
}