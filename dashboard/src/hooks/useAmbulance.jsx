import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import AmbulanceServices from '../utils/services/AmbulanceServices';
import { toastProps } from '../utils/toastProps';
import { getError } from '../utils/getError';

export const useAmbulance = () => {

    const toast = useToast();
    const [ambulances, setAmbulances] = useState([]);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchAllAmbulances = async () => {
            await AmbulanceServices.fetchAllAmbulances()
                .then((response) => {
                    setAmbulances(response);
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
        fetchAllAmbulances();
    }, [toast]);

    return { stateLoading, ambulances }
}

export const useSpecificAmbulance = (id) => {
    const toast = useToast();
    const [ambulance, setAmbulance] = useState([]);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchAmbulance = async () => {
            await AmbulanceServices.fetchSpecificAmbulance(id)
                .then((response) => {
                    setAmbulance(response);
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
        fetchAmbulance();
    }, [toast, id]);

    return { stateLoading, ambulance }
}
