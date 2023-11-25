import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@chakra-ui/react';
import SessionServices from '../utils/services/SessionServices';
import { toastProps } from '../utils/toastProps';
import { getError } from '../utils/getError';

export const useHospitalSession = (hospitalId, startDate) => {
    const toast = useToast();
    const [hospitalSuccessSessionCount, setHospitalSuccessSessionCount] = useState(0);
    const [hospitalFailedSessionCount, setHospitalFailedSessionCount] = useState(0);
    const [hospitalSessionstateLoading, setHospitalSessionStateLoading] = useState(true);

    const currentDate = useMemo(() => new Date(), []);

    const endDate = currentDate.toISOString();


    useEffect(() => {
        const fetchHospitalSessions = async () => {
            await SessionServices.getHospitalSession(hospitalId, startDate ? startDate : new Date(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-01`).toISOString(), endDate)
                .then((response) => {
                    setHospitalSuccessSessionCount(response.successful);
                    setHospitalFailedSessionCount(response.failed)
                    setHospitalSessionStateLoading(false);
                })
                .catch((error) => {
                    toast({
                        ...toastProps,
                        description: getError(error),
                        status: "error"
                    })
                })
        }
        fetchHospitalSessions();
    }, [toast, hospitalId, startDate, endDate, currentDate]);

    const hospitalChartData = useMemo(
        () => ({
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },

            data: {
                labels: ["successful", "failed"],
                datasets: [
                    {
                        label: "Hopital session",
                        data: [hospitalSuccessSessionCount, hospitalFailedSessionCount],
                        backgroundColor: ["#16AC52", "#B50909"],
                    },
                ],
                text: "35",
            },
        }), [hospitalFailedSessionCount, hospitalSuccessSessionCount]
    );


    return { hospitalSessionstateLoading, hospitalChartData }

}

export const useAmbulanceSession = (ambulanceId, startDate) => {

    const toast = useToast();
    const [ambulanceSuccessSessionCount, setAmbulanceSuccessSessionCount] = useState(0);
    const [ambulanceFailedSessionCount, setAmbulanceFailedSessionCount] = useState(0);
    const [ambulanceSessionStateLoading, setAmbulanceSessionStateLoading] = useState(true);

    const currentDate = useMemo(() => new Date(), []);

    const endDate = currentDate.toISOString();

    useEffect(() => {
        const fetchAmbulanceSessions = async () => {
            await SessionServices.getAmbulanceSession(ambulanceId, startDate ? startDate : new Date(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-01`).toISOString(), endDate)
                .then((response) => {
                    setAmbulanceSuccessSessionCount(response.successful);
                    setAmbulanceFailedSessionCount(response.failed)
                    setAmbulanceSessionStateLoading(false);
                })
                .catch((error) => {
                    toast({
                        ...toastProps,
                        description: getError(error),
                        status: "error"
                    })
                })
        }
        fetchAmbulanceSessions();
    }, [toast, ambulanceId, startDate, endDate, currentDate]);

    const ambulanceChartData = useMemo(
        () => ({
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },

            data: {
                labels: ["successful", "failed"],
                datasets: [
                    {
                        label: "Ambulance session",
                        data: [ambulanceSuccessSessionCount, ambulanceFailedSessionCount],
                        backgroundColor: ["#16AC52", "#B50909"],
                    },
                ],
                text: "35",
            },
        }), [ambulanceFailedSessionCount, ambulanceSuccessSessionCount]
    );

    return { ambulanceSessionStateLoading, ambulanceChartData }
}
