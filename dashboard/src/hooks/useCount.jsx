import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import CountServices from '../utils/services/CountServices';
import { toastProps } from '../utils/toastProps';
import { getError } from '../utils/getError';

export const useCount = () => {

    const toast = useToast();
    const [ambulanceCount, setAmbulanceCount] = useState(0);
    const [hospitalCount, setHospitalCount] = useState(0);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchCount = async () => {
            await CountServices.fetchCount()
                .then((response) => {
                    setAmbulanceCount(response?.ambulanceCount);
                    setHospitalCount(response?.hospitalCount);
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
        fetchCount();
    }, [toast]);

    return { stateLoading, ambulanceCount, hospitalCount }
}