import { useState, useCallback } from "react";
import { Box, Text, Center, HStack, Select, useToast } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useTable } from "../hooks/useTable";
import CustomButton from "../components/general/CustomButton";
import AddFireFighter from "../modal/AddFireFighter";
import Table from "../components/general/table/Table";
import TablePagination from "../components/general/table/TablePagination";
import { FiSearch } from "react-icons/fi";
import { useFireFighter } from "../hooks/useFireFighter";
import AmbulanceServices from '../utils/services/AmbulanceServices';
import { toastProps } from '../utils/toastProps';
import { getError } from '../utils/getError';



export const FireFighter = () => {
    const toast = useToast();
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [openFireFighter, setOpenFireFighter] = useState(false);

    const { stateLoading, fireFighters } = useFireFighter();

    const { slice, pages, count } = useTable(fireFighters, page, perPage);

    const updatePerPage = (count) => {
        setPerPage(count);
        setPage(1);
    };

    const handleOpenFireFighter = useCallback(() => {
        setOpenFireFighter(true);
    }, []);

    const handleCloseFireFighter = useCallback(() => {
        setOpenFireFighter(false);
    }, []);

    const handleDelete = async (id, name) => {
        try {
            AmbulanceServices.deleteAmbulance(id).then(() => {
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
                        <Text className="text-primary_color font-semibold text-3xl">Fire fighters</Text>
                        <Center>
                            <CustomButton
                                type="button"
                                text="Add Fire Fighter"
                                variant={"solid"}
                                width={"200px"}
                                fontSize={"16px"}
                                handleClick={handleOpenFireFighter}
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
                                    placeholder="Type to search fire fighter"
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
                            {slice?.filter((ambulance) => {
                                return (
                                    ambulance === "" ? ambulance :
                                        ambulance.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                                        ambulance.contactNumber.toLowerCase().includes(searchValue.toLowerCase())
                                )
                            })?.map((data, index) => {
                                return (
                                    <tr key={index} className="h-20 border-b">
                                        <td className="py-3 px-4 text-sm text-center">{data.name}</td>
                                        <td className="py-3 px-4 text-sm text-center">{data.contactNumber}</td>
                                        {/* actions table */}
                                        <td>
                                            <Link to={`/fire_fighter/${data?._id}`} className="flex justify-center">
                                                <CustomButton type="button" variant={"solid"} text="View" width={"80px"} />
                                            </Link>
                                        </td>
                                        <td>
                                            <CustomButton handleClick={() => handleDelete(data?._id, data?.name)} type="button" variant={"solid"} text="Delete" width={"80px"} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </Table>
                    )}
                </Box>

                <AddFireFighter
                    isOpen={openFireFighter}
                    onClose={handleCloseFireFighter}
                />
            </Box>
        </Layout >
    )
}

const options = [5, 10, 15, 20]