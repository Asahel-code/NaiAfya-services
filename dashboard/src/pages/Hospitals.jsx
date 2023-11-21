import { useState, useCallback } from "react";
import { Box, Text, Center, HStack, Select, useToast } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useTable } from "../hooks/useTable";
import CustomButton from "../components/general/CustomButton";
import Table from "../components/general/table/Table";
import TablePagination from "../components/general/table/TablePagination";
import { FiSearch } from "react-icons/fi";
import AddHospital from "../modal/AddHospital";
import { useHospital } from "../hooks/useHospital";
import HospitalServices from '../utils/services/HospitalServices';
import { toastProps } from '../utils/toastProps';
import { getError } from '../utils/getError';

export const Hospitals = () => {

    const toast = useToast();
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [openAddHospital, setOpenAddHospital] = useState(false);

    const { stateLoading, hospitals } = useHospital();

    const { slice, pages, count } = useTable(hospitals, page, perPage);

    const updatePerPage = (count) => {
        setPerPage(count);
        setPage(1);
    };

    const handleOpenAddHospital = useCallback(() => {
        setOpenAddHospital(true);
    }, []);

    const handleCloseHospital = useCallback(() => {
        setOpenAddHospital(false);
    }, []);

    const handleDelete = async (id, name) => {
        try {
            HospitalServices.deleteHospital(id).then(() => {
                toast({
                    ...toastProps,
                    description: `${name}, has been deleted successfully`,
                    status: "success"
                });
                window.location.reload()
            })
        } catch (error) {
            toast({
                ...toastProps,
                description: getError(error),
                status: "error"
            });
        }
    }

    return (
        <Layout>
            <Box maxH={"91%"} overflowY={"scroll"}>
                <Box width={"full"} bg={"white"}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={14} py={3}>
                        <Text className="text-primary_color font-semibold text-3xl">Hospitals</Text>
                        <Center>
                            <CustomButton
                                type="button"
                                text="Add Hospital"
                                variant={"solid"}
                                width={"200px"}
                                fontSize={"16px"}
                                handleClick={handleOpenAddHospital}
                            />
                        </Center>
                    </Box>
                </Box>
                <Box>
                    <Box my={6} bg={"white"} py={4} px={8} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <HStack spacing={5}>
                            <Text fontWeight="normal" fontSize={"sm"} line-height="short">
                                Show Entries
                            </Text>
                            <Select
                                border={1.0}
                                borderStyle="solid"
                                borderColor="gray.300"
                                focusBorderColor="gray.300"
                                borderRadius={"none"}
                                color="black"
                                width={28}
                                h={9}
                                gap="xs"
                                bg="white"
                                onChange={(e) => updatePerPage(parseInt(e.target.value))}
                            >
                                {options.map((pageOption, index) => (
                                    <option key={index} value={pageOption}>
                                        {pageOption}
                                    </option>
                                ))}
                            </Select>
                        </HStack>
                        <Box
                            w={"230px"}
                            overflow={"hidden"}
                        >
                            <Box display={"flex"} alignItems={"center"} gap={3}>
                                <input
                                    placeholder="Type to search Hospital"
                                    className="border-0 outline-none focus:outline-none h-8 w-28 flex-grow"
                                    type="text"
                                    onChange={(e) => setSearchValue(e.target.value)}

                                />
                                <Center
                                    h={"5"}
                                    w={"5"}
                                    textColor={"gray.500"}
                                    fontSize={"lg"}
                                >
                                    <FiSearch />
                                </Center>
                            </Box>
                        </Box>
                    </Box>
                    {!stateLoading && (
                        <Table
                            headers={["name", "contact number", "action"]}
                            paddingX={"px-8"}
                            footer={
                                <TablePagination
                                    pages={pages}
                                    setPage={setPage}
                                    page={page}
                                    count={count}
                                />
                            }
                        >
                            {slice?.filter((hospital) => {
                                return (
                                    hospital === "" ? hospital :
                                        hospital.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                                        hospital.contactNumber.toLowerCase().includes(searchValue.toLowerCase())
                                )
                            })?.map((data, index) => {
                                return (
                                    <tr key={index} className="h-20 border-b">
                                        <td className="py-3 px-4 text-sm text-center">
                                            {data.name}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-center">
                                            {data.contactNumber}
                                        </td>
                                        {/* actions table */}
                                        <td className="">
                                            <Link to={`/hospital/${data?._id}`} className="flex justify-center">
                                                <CustomButton type="button" variant={"solid"} text="View" width={"80px"} />
                                            </Link>
                                        </td>
                                        <td className="">
                                            <CustomButton handleClick={() => handleDelete(data?._id, data?.name)} type="button" variant={"solid"} text="Delete" width={"80px"} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </Table>
                    )}
                </Box>

                <AddHospital
                    isOpen={openAddHospital}
                    onClose={handleCloseHospital}
                />
            </Box>
        </Layout>
    )
}

const options = [5, 10, 15, 20]

// const hospitals = [
//     {
//         _id: 1,
//         name: "Makarange Hardware",
//         contactNumber: "+254708989212"
//     },
//     {
//         _id: 2,
//         name: "Makarange Hardware",
//         contactNumber: "+254708989212"
//     },
//     {
//         _id: 3,
//         name: "Makarange Hardware",
//         contactNumber: "+254708989212"
//     },
//     {
//         _id: 4,
//         shop_name: "Makarange Hardware",
//         name: "Makarange Hardware",
//         contactNumber: "+254708989212"
//     },
//     {
//         _id: 5,
//         name: "Makarange Hardware",
//         contactNumber: "+254708989212"
//     },
//     {
//         _id: 6,
//         name: "Makarange Hardware",
//         contactNumber: "+254708989212"
//     }
// ]

