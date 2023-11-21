import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import AuthServices from '../utils/services/AuthServices';
import { toastProps } from '../utils/toastProps';
import { getError } from '../utils/getError';

export const useUser = () => {
    const toast = useToast();
    const [user, setUser] = useState(undefined);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            await AuthServices.fetchUser()
                .then((response) => {
                    setUser(response);
                    setStateLoading(false);
                })
                .catch((error) => {
                    toast({
                        ...toastProps,
                        description: getError(error),
                        status: "error"
                    })
                })
        }
        fetchLoggedInUser();
    }, [toast]);

    return { stateLoading, user }
}