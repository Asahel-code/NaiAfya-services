import { useState, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { Box, Text, Center } from "@chakra-ui/react";
import Layout from "../components/Layout";
import CustomButton from "../components/general/CustomButton";
import Wrapper from "../components/general/Wrapper";
import UpdateAmbulance from '../modal/UpdateAmbulance';
import { PieChart } from "../components/charts/PieChart";
import { useSpecificAmbulance } from "../hooks/useAmbulance";
import { getArrayOfDates } from '../utils/arrayOfDatesFilterValues';
import { CustomSelect } from '../components/general/CustomInput';
import { useAmbulanceSession } from '../hooks/useSession';

export const ViewSpecifcAmbulance = () => {

    let { id } = useParams();

    const { stateLoading, ambulance } = useSpecificAmbulance(id);

    const [openUpdateAmbulance, setOpenUpdateAmbulance] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [current, setCurrent] = useState({});

    const { ambulanceSessionStateLoading, ambulanceChartData } = useAmbulanceSession(id, startDate);

    const handleOpenUpdateAmbulance = useCallback(() => {
        setOpenUpdateAmbulance(true);
    }, []);

    const handleCloseAmbulance = useCallback(() => {
        setOpenUpdateAmbulance(false);
    }, []);

    const durationValuesFilter = getArrayOfDates();

    return (
        <Layout>
            {!stateLoading && (
                <Box maxH={"91%"} overflowY={"scroll"}>
                    <Box width={"full"} bg={"white"}>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={14} py={3}>
                            <Text className="text-primary_color font-semibold text-3xl">{ambulance?.name}</Text>
                            <Center>
                                <CustomButton
                                    type="button"
                                    text="Update Ambulance Service"
                                    variant={"solid"}
                                    width={"200px"}
                                    fontSize={"16px"}
                                    handleClick={() => {
                                        handleOpenUpdateAmbulance()
                                        setCurrent(ambulance)
                                    }}
                                />
                            </Center>
                        </Box>
                    </Box>
                    <Box className="mt-4 mx-2">
                        <Wrapper>
                            <div className="w-full h-full flex flex-col">
                                <div className="px-5 flex justify-between items-center">
                                    <h4 className="font-semibold text-xl">Calls made</h4>
                                    <CustomSelect
                                        width={"150px"}
                                        name="period filter"
                                        placeholder={"This month"}
                                        handleChange={(e) => setStartDate(e.target.value)}
                                    >
                                        {durationValuesFilter?.map((period, index) => (
                                            <option key={index} value={period?.value}>{period?.name}</option>
                                        ))

                                        }
                                    </CustomSelect>
                                </div>
                                <div className={"flex flex-col items-center w-full"}>
                                    <div className="h-[340px]">
                                        {!ambulanceSessionStateLoading && (
                                            <PieChart data={ambulanceChartData.data} options={ambulanceChartData.options} />
                                        )}
                                    </div>
                                    <div className={"flex flex-col gap-y-2 mt-2 w-1/2 self-center"}>
                                        {!ambulanceSessionStateLoading && (
                                            ambulanceChartData.data.datasets[0].backgroundColor?.map((item, index) => (
                                                <div key={index} className={"flex justify-between items-center"}>
                                                    <div className={"flex gap-x-2 items-center text-sm "}>
                                                        <div
                                                            style={{ backgroundColor: item }}
                                                            className={` h-3 w-3 rounded-full`}
                                                        />

                                                        <span className='text-lg'>{ambulanceChartData.data.labels[index]}</span>
                                                    </div>
                                                    {ambulanceChartData.data.datasets[0].data[index]}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                        <UpdateAmbulance
                            isOpen={openUpdateAmbulance}
                            onClose={handleCloseAmbulance}
                            current={current}
                        />
                    </Box>
                </Box >)}
        </Layout >
    )
}

