import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

export const hooks = {
  useDashboard: () => {
    return useQuery({
      queryKey: ['dashboard'],
      queryFn: async () => {
        const response = await api.get('home/total-income-expense');
        return response.data;
      }
    });
  },
  useTransactionHistory: () => {
    return useQuery({
        queryKey: ['dashboard-transaction-history'],
        queryFn: async ({page, perPage}) => {
            const response = await api.get('home/transaction-history', {page, perPage})
        }
    })
  }
};
