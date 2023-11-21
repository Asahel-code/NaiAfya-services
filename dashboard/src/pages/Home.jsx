import { useMemo } from "react";
import Layout from "../components/Layout";
import { Box, HStack, Text } from "@chakra-ui/react";
import Card from "../components/home/Card";
import { FaHospitalSymbol } from "react-icons/fa";
import { BiSolidAmbulance } from "react-icons/bi";
import { useCount } from "../hooks/useCount";

export const Home = () => {

    const {ambulanceCount, hospitalCount } = useCount();

    const activities = useMemo(() => [
        {
            title: "Hospitals",
            count: hospitalCount,
            icon: <FaHospitalSymbol className="text-5xl" />
        },
        {
            title: "Ambulances",
            count: ambulanceCount,
            icon: <BiSolidAmbulance className="text-5xl" />
        },

    ], [ambulanceCount, hospitalCount]);
    return (
        <Layout>
            <Box maxH={"91%"} overflowY={"scroll"}>
                <Box width={"full"} bg={"#FCFCFC"}>
                    <HStack px={8} spacing={0} py={4}>
                        <Text className="text-primary_color font-semibold text-3xl">Overview</Text>
                    </HStack>
                </Box>

                <Box className="mt-20">
                    <Box display={"flex"} gap={20} justifyContent={"center"} alignItems={"center"}>
                        {activities?.map((activity, index) => (
                            <Card
                                key={index}
                                serviceName={activity.title}
                                count={activity.count}
                                icon={activity.icon}
                            />
                        ))}
                    </Box>
                </Box>

            </Box>
        </Layout>
    )
}


