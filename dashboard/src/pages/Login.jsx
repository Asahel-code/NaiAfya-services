import { Box, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomInput from '../components/general/CustomInput'
import { PreFormartNumber } from '../components/general/PreFormatNumber'
import { toastProps } from '../utils/toastProps'
import { getError } from '../utils/getError'
import AuthServices from '../utils/services/AuthServices'
import CustomButton from '../components/general/CustomButton'
import LoadingButton from '../components/general/LoadingButton'
import { useUserStore } from "../utils/zustand/Store";

export const Login = () => {

    const toast = useToast();
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password");
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        phoneNumber: "",
        password: "",
    });

    const setUser = useUserStore((state) => state.setUser);
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        if (user?.token) {
            navigate('/');
        }
    }, [user?.token, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formartPhoneNumber = "+254".concat(state.phoneNumber)

        const data = {
            phoneNumber: formartPhoneNumber,
            password: state.password
        }

        try {
            await AuthServices.login(data).then((response) => {
                toast({
                    ...toastProps,
                    description: response.message,
                    status: "success"
                });
                setUser(response);
                setLoading(false);
                navigate('/');
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
        <div className='px-3 h-screen flex justify-center items-center bg-slate-100'>
            <div className='rounded-lg shadow-lg md:w-1/3 w-full p-5 bg-white'>
                <div className='text-center'>
                    <h4 className='text-3xl my-5 font-semibold'>Login</h4>
                </div>
                <Box className="flex flex-col gap-1 w-full">
                    <FormControl my={2} isRequired>
                        <FormLabel>Phone number</FormLabel>
                        <CustomInput
                            width="full"
                            icon={<PreFormartNumber />}
                            placeholder={"Login number"}
                            handleChange={handleChange}
                            name={"phoneNumber"}
                            type={"number"}
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
                <Box mt="3">
                    {loading ? (
                        <LoadingButton />
                    ) : (
                        <CustomButton variant={"solid"} text={"Login"} handleClick={handleSubmit} width={"full"} />
                    )}
                </Box>
            </div>
        </div>
    )
}
