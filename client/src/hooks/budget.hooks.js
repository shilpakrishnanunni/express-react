import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";


export const hooks = {
    callBudgetDashboard: () => {
        return useQuery({
            queryKey: ["budget-dashboard"],
            queryFn: async () => {
                return api.get("budget")
            }
        })
    }
};
