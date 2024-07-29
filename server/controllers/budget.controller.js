import { Categories, MonthlyBudget, Users } from "../models/index.js";

export const getBudgetDashboard = async (req, res, next) => {
    try {
        const userID = 1;
        const response = {};
        const [budgetCategories, user, monthlyBudget] = await Promise.all([
            Categories.findAll({ attributes: ["id", "name"], where: { status: '1' }, raw:true }),
            Users.findOne({ attributes: ["budget"], where: { id: userID }, raw: true }),
            MonthlyBudget.findAll({
                where: { userId: 1 },
                include: [
                    {
                        model: Categories,
                        attributes: ["id", "name", "recurring"]
                    }
                ],
                raw: true
            })
        ]);
        console.log("budgetCategories",budgetCategories)
        response.budgetAmount = user.budget;
        
        let dropdownCategories; let listCategories;
        if (budgetCategories.length==0) {
            dropdownCategories = { value: "", label: "No Categories" };
            listCategories = {};
            return res.json({ budgetAmount: user.budget, budgetCategories: { dropdownCategories, listCategories } });
        }

        dropdownCategories = budgetCategories.map (row => ({ value: row.id, label: row.name }));
        dropdownCategories.push({ value: '', label: 'SELECT CATEGORY' });
        listCategories = monthlyBudget.map(row => ({
            id: row.id,
            name: row['Category.name'],
            totalAmount: row.totalAmount,
            amountLeft: row.amountLeft,
            recurring: row['Category.recurring']
        }));
        
        return res.json({ budgetAmount: user.budget, budgetCategories: { dropdownCategories, listCategories } });
    } catch (error) {
        console.log("ERROR FROM getBudgetDashboard", error);
        return next(error);        
    }
};

// TODO check recurring -> Categories.recurring = 1 where userId
// TODO BudgetHistory table -> user_id, budget(amount), monthstart, monthend

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
    
        // await Categories.update({ status: "1" }, { where: { id: categoryId } });
        await MonthlyBudget.create({
            userId: 1,
            categoryId,
            totalAmount: 0,
            amountLeft: 0
        });
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