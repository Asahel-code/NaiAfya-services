import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import HospitalServices from '../utils/services/HospitalServices';
import { toastProps } from '../utils/toastProps';
import { getError } from '../utils/getError';


export const useHospital = () => {
    const toast = useToast();
    const [hospitals, setHospitals] = useState([]);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchAllHospitals = async () => {
            await HospitalServices.fetchAllHospitals()
                .then((response) => {
                    setHospitals(response);
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
        fetchAllHospitals();
    }, [toast]);

    return { stateLoading, hospitals }
}

export const useSpecificHospital = (id) => {
    const toast = useToast();
    const [hospital, setHospital] = useState(undefined);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchSpecificHospital = async () => {
            await HospitalServices.fetchSpecificHospital(id)
                .then((response) => {
                    setHospital(response);
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
        fetchSpecificHospital();
    }, [toast, id]);

    return { stateLoading, hospital }
}
