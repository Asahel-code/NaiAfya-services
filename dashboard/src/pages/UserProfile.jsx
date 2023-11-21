import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Box, Center, HStack, FormControl, FormLabel, Text, useToast } from "@chakra-ui/react";
import { useUser } from "../hooks/useUser";
import CustomInput from '../components/general/CustomInput';
import { PreFormartNumber } from '../components/general/PreFormatNumber';
import AuthServices from '../utils/services/AuthServices';
import CustomButton from '../components/general/CustomButton';
import LoadingButton from '../components/general/LoadingButton';
import { toastProps } from '../utils/toastProps';
import { getError } from '../utils/getError';
import { useUserStore } from "../utils/zustand/Store";

export const UserProfile = () => {

    const { stateLoading, user } = useUser();
    const removeUser = useUserStore((state) => state.removeUser);
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const [state, setState] = useState({
        name: "",
        phoneNumber: "",
        password: "",
        passwordConfirmation: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        if (!stateLoading) {
            const phoneNumber = user?.phoneNumber?.split('+254');
            setState((prev) => ({
                ...prev,
                name: user?.username,
                phoneNumber: phoneNumber && parseInt(phoneNumber[1])
            }))
        }
    }, [stateLoading, user])

    const handleSubmit = async () => {
        setLoading(true);

        if (state.password !== state.passwordConfirmation) {
            toast({
                ...toastProps,
                description: "Confirm your password again, it does not match",
                status: "error"
            })
            setLoading(false);
            return
        }

        const formartPhoneNumber = "+254".concat(state.phoneNumber)

        const data = {
            name: state.name,
            phoneNumber: formartPhoneNumber,
            password: state.password,
            passwordConfirmation: state.passwordConfirmation,
        }

        try {
            await AuthServices.updateUser(data).then((response) => {
                toast({
                    ...toastProps,
                    description: response.message,
                    status: "success"
                });
                setLoading(false);
                removeUser();
            })
        } catch (error) {
            toast({
                ...toastProps,
                description: getError(error),
                status: "error"
            });
            setLoading(false);
        }
    }

    return (
        <Layout>
            <Box maxH={"91%"} overflowY={"scroll"}>
                <Box width={"full"} bg={"#FCFCFC"}>
                    <HStack px={8} spacing={0} py={4}>
                        <Text className="text-primary_color font-semibold text-3xl">My Profile</Text>
                    </HStack>
                </Box>
                <Center mt={6}>
                    <div className='rounded-lg shadow-lg md:w-1/3 w-full p-5 bg-white'>
                        <Box className="flex flex-col gap-1 w-full">
                            <FormControl my={2} isRequired>
                                <FormLabel>Username</FormLabel>
                                <CustomInput
                                    width="full"
                                    placeholder={"Username"}
                                    handleChange={handleChange}
                                    name={"name"}
                                    type={"text"}
                                    value={state.name}
                                />
                            </FormControl>
                        </Box>
                        <Box className="flex flex-col gap-1 w-full">
                            <FormControl my={2} isRequired>
                                <FormLabel>Phone number</FormLabel>
                                <CustomInput
                                    width="full"
                                    icon={<PreFormartNumber />}
                                    placeholder={"Login number"}
                                    name={"phoneNumber"}
                                    type={"number"}
                                    isDisabled={true}
                                    value={state.phoneNumber}
                                />
                            </FormControl>
                        </Box>
                        <Box className="flex flex-col gap-1 w-full">
                            <FormControl my={2} isRequired>
                                <FormLabel>Password</FormLabel>
                                <CustomInput
                                    width="full"
                                    placeholder={"*******"}
                                    handleChange={handleChange}
                                    name={"password"}
                                    type={passwordType}
                                    handleEyeClick={(type) => setPasswordType(type)}
                                />
                            </FormControl>
                        </Box>
                        <Box className="flex flex-col gap-1 w-full">
                            <FormControl my={2} isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <CustomInput
                                    width="full"
                                    placeholder={"*******"}
                                    handleChange={handleChange}
                                    name={"passwordConfirmation"}
                                    type={confirmPasswordType}
                                    handleEyeClick={(type) => setConfirmPasswordType(type)}
                                />
                            </FormControl>
                        </Box>
                        <Box mt="3">
                            {loading ? (
                                <LoadingButton />
                            ) : (
                                <CustomButton variant={"solid"} text={"Update"} handleClick={handleSubmit} width={"full"} />
                            )}
                        </Box>
                    </div>
                </Center>

            </Box>
        </Layout>
    )
}


