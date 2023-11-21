import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import CustomModal from "../components/general/CustomModal";
import CustomInput from "../components/general/CustomInput";
import { PreFormartNumber } from "../components/general/PreFormatNumber";
import { toastProps } from "../utils/toastProps";
import { getError } from "../utils/getError";
import AmbulanceServices from "../utils/services/AmbulanceServices";

const UpdateAmbulance = ({ isOpen, onClose, current }) => {

    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        name: "",
        contactNumber: 0
    });

    useEffect(() => {
        const contactNumber = current?.contactNumber?.split('+254');
        setState((prev) => ({
            ...prev,
            name: current?.name,
            contactNumber: contactNumber && parseInt(contactNumber[1])
        }))
    }, [current]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formartContactNumber = "+254".concat(state.contactNumber)

        const data = {
            name: state.name,
            contactNumber: formartContactNumber
        }

        try {
            await AmbulanceServices.updateAmbulance(data, current?._id).then((response) => {
                toast({
                    ...toastProps,
                    description: response.message,
                    status: "success"
                });
                setLoading(false);
                onClose();
                window.location.reload();
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
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            showUpdate={true}
            loadingUpdate={loading}
            handleUpdate={handleSubmit}
            title="Update Ambulance serivce"
        >
            <Box className="flex flex-col gap-1 w-full">
                <FormControl my={2} isRequired>
                    <FormLabel>Ambulance service name</FormLabel>
                    <CustomInput
                        width="full"
                        placeholder={"Ambulance service name"}
                        handleChange={handleChange}
                        name={"name"}
                        type={"text"}
                        value={state.name}
                    />
                </FormControl>
            </Box>
            <Box className="flex flex-col gap-1 w-full">
                <FormControl my={2} isRequired>
                    <FormLabel>Contact number</FormLabel>
                    <CustomInput
                        width="full"
                        icon={<PreFormartNumber />}
                        placeholder={"720000000"}
                        handleChange={handleChange}
                        name={"contactNumber"}
                        type={"number"}
                        value={state.contactNumber}
                    />
                </FormControl>
            </Box>
        </CustomModal >
    )
}

UpdateAmbulance.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    current: PropTypes.object.isRequired
}

export default UpdateAmbulance