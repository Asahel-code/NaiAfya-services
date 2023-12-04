import { useMemo } from "react";
import Layout from "../components/Layout";
import { Box, HStack, Text } from "@chakra-ui/react";
import Card from "../components/home/Card";
import { FaHospitalSymbol } from "react-icons/fa";
import { BiSolidAmbulance } from "react-icons/bi";
import { GiPoliceCar } from "react-icons/gi";
import { MdFireTruck } from "react-icons/md"
import { useCount } from "../hooks/useCount";

export const Home = () => {

    const { ambulanceCount, hospitalCount, fireFighterCount, policeStationCount } = useCount();

    const activities = useMemo(() => [
        {
            title: "Hospitals",
            count: hospitalCount,
            icon: <FaHospitalSymbol className="text-4xl" />
        },
        {
            title: "Ambulances",
            count: ambulanceCount,
            icon: <BiSolidAmbulance className="text-4xl" />
        },
        {
            title: "Fire fighter",
            count: fireFighterCount,
            icon: <MdFireTruck className="text-4xl" />
        },
        {
            title: "Police station",
            count: policeStationCount,
            icon: <GiPoliceCar className="text-4xl" />
        },

    ], [ambulanceCount, hospitalCount, fireFighterCount, policeStationCount]);
    return (
        <Layout>
            <Box maxH={"91%"} overflowY={"scroll"}>
                <Box width={"full"} bg={"#FCFCFC"}>
                    <HStack px={8} spacing={0} py={4}>
                        <Text className="text-primary_color font-semibold text-3xl">Overview</Text>
                    </HStack>
                </Box>

                <Box className="mt-8">
                    <Box display={"flex"} gap={20} justifyContent={"center"} alignItems={"center"}>
                        <div className="grid grid-cols-2 gap-8">
                            {activities?.map((activity, index) => (
                                <Card
                                    key={index}
                                    serviceName={activity.title}
                                    count={activity.count}
                                    icon={activity.icon}
                                />
                            ))}
                        </div>

                    </Box>
                </Box>

            </Box>
        </Layout>
    )
}


