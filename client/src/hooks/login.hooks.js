import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

export const hooks = {
    useLoginSubmit: () => {
        return useMutation({
            mutationFn: async(loginData) => {
                const response = await api.post("login",loginData);
                return response.data;
            }
        });
    },
    useSignUpSubmit: () => {
        return useMutation({
            mutationFn: async(signupData) => {
                const response = await api.post("signup",signupData);
                return response.data;
            }
        });
    },
    useForgotPasswordSubmit: () => {
        return useMutation({
            mutationFn: async(email) => {
                const response = await api.post("forgot-password",email);
                return response.data;
            }
        })

    },
    useLogout: () => {
        return useMutation({
            mutationFn: async (userId) => {
                const response = await api.post("logout",{userId});
                return response.data;
            }
        })
    }
};