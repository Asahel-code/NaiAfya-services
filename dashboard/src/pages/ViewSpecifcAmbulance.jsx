import { useState, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { Box, Text, Center } from "@chakra-ui/react";
import Layout from "../components/Layout";
import CustomButton from "../components/general/CustomButton";
import Wrapper from "../components/general/Wrapper";
import UpdateAmbulance from '../modal/UpdateAmbulance';
// import { BarChart } from "../components/charts/BarChart";
import { useSpecificAmbulance } from "../hooks/useAmbulance";

export const ViewSpecifcAmbulance = () => {

    let { id } = useParams();

    const { stateLoading, ambulance } = useSpecificAmbulance(id);

    const [openUpdateAmbulance, setOpenUpdateAmbulance] = useState(false);
    const [current, setCurrent] = useState({});

    const handleOpenUpdateAmbulance = useCallback(() => {
        setOpenUpdateAmbulance(true);
    }, []);

    const handleCloseAmbulance = useCallback(() => {
        setOpenUpdateAmbulance(false);
    }, []);

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
                            <div className="w-full h-[330px] flex flex-col">
                                <div className="px-5">
                                    <p className="font-semibold">Calls made</p>
                                </div>
                                <div className="h-[600px]">
                                    {/* <BarChart/> */}
                                </div>

                            </div>
                        </Wrapper>
                        <UpdateAmbulance
                            isOpen={openUpdateAmbulance}
                            onClose={handleCloseAmbulance}
                            current={current}
                        />
                    </Box>
                </Box>)}
        </Layout>
    )
}

