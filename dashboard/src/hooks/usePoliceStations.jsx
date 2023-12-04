import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import PoliceStationServices from '../utils/services/PoliceStationServices';
import { toastProps } from '../utils/toastProps';
import { getError } from '../utils/getError';

export const usePoliceStation = () => {

    const toast = useToast();
    const [policeStations, setPoliceStations] = useState([]);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchAllPoliceStations = async () => {
            await PoliceStationServices.fetchAllPoliceStations()
                .then((response) => {
                    setPoliceStations(response);
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
        fetchAllPoliceStations();
    }, [toast]);

    return { stateLoading, policeStations }
}

export const useSpecificPoliceStation = (id) => {
    const toast = useToast();
    const [policeStation, setPoliceStation] = useState([]);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchPoliceStation = async () => {
            await PoliceStationServices.fetchSpecificPoliceStation(id)
                .then((response) => {
                    setPoliceStation(response);
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
        fetchPoliceStation();
    }, [toast, id]);

    return { stateLoading, policeStation }
}
