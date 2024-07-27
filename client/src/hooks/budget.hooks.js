import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const hooks = {
  useBudgetDashboard: () => {
    return useQuery({
      queryKey: ['budget-dashboard'],
      queryFn: async () => {
        return api.get('budget');
      }
    });
  },
  useSelectCategory: () => {
    return useMutation({
      mutationFn: (categoryId) => {
        return api.patch('budget/select-category', { categoryId });
      }
    });
  }
};
