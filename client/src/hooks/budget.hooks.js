import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

export const hooks = {
  useBudgetDashboard: () => {
    return useQuery({
      queryKey: ['budget-dashboard'],
      queryFn: async () => {
        const response = await api.get('budget');
        return response.data;
      }
    });
  },
  useSelectCategory: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (categoryId) => {
        await api.patch('budget/select-category', { categoryId });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['budget-dashboard']);
      },
      onError: (error) => {
        console.error("useSelectCategory (useMutation) ERROR", error)
      }
    });
  }
};
