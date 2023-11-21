import { useState, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { Box, Text, Center } from "@chakra-ui/react";
import Layout from "../components/Layout";
import CustomButton from "../components/general/CustomButton";
import Wrapper from "../components/general/Wrapper";
import UpdateHospital from '../modal/UpdateHospital';
// import { BarChart } from "../components/charts/BarChart";
import { useSpecificHospital } from "../hooks/useHospital";

export const ViewSpecificHospital = () => {

    let { id } = useParams();

    const { stateLoading, hospital } = useSpecificHospital(id);

    const [openUpdateHospital, setOpenUpdateHospital] = useState(false);
    const [current, setCurrent] = useState({});

    const handleOpenUpdateHospital = useCallback(() => {
        setOpenUpdateHospital(true);
    }, []);

    const handleCloseHospital = useCallback(() => {
        setOpenUpdateHospital(false);
    }, []);

    return (
        <Layout>
            {!stateLoading && (
                <Box maxH={"91%"} overflowY={"scroll"}>
                    <Box width={"full"} bg={"white"}>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={14} py={3}>
                            <Text className="text-primary_color font-semibold text-3xl">{hospital?.name}</Text>
                            <Center>
                                <CustomButton
                                    type="button"
                                    text="Update Ambulance Service"
                                    variant={"solid"}
                                    width={"200px"}
                                    fontSize={"16px"}
                                    handleClick={() => {
                                        handleOpenUpdateHospital()
                                        setCurrent(hospital)
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
                    </Box>
                    <UpdateHospital
                        isOpen={openUpdateHospital}
                        onClose={handleCloseHospital}
                        current={current}
                    />
                </Box>
            )}
        </Layout>
    )
}
