import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import FireFighterServices from '../utils/services/FireFighterServices';
import { toastProps } from '../utils/toastProps';
import { getError } from '../utils/getError';

export const useFireFighter = () => {

    const toast = useToast();
    const [fireFighters, setFireFighters] = useState([]);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchAllFireFighters = async () => {
            await FireFighterServices.fetchAllFireFighters()
                .then((response) => {
                    setFireFighters(response);
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
        fetchAllFireFighters();
    }, [toast]);

    return { stateLoading, fireFighters }
}

export const useSpecificFireFighter = (id) => {
    const toast = useToast();
    const [fireFighter, setFireFighter] = useState([]);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchFireFighter = async () => {
            await FireFighterServices.fetchSpecificFireFighter(id)
                .then((response) => {
                    setFireFighter(response);
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
        fetchFireFighter();
    }, [toast, id]);

    return { stateLoading, fireFighter }
}
