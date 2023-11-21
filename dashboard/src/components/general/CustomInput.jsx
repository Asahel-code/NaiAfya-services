import PropTypes from 'prop-types';
import { Box, Center } from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const CustomInput = ({
    icon,
    placeholder = "Search",
    type = "text",
    value,
    handleChange,
    name,
    width,
    handleEyeClick,
    isDisabled
}) => {
    return (
        <Box
            display={"flex"}
            gap={"1"}
            alignItems={"center"}
            bg={"white"}
            borderWidth={"1px"}
            overflow={"hidden"}
            borderRadius={"lg"}
            borderColor={"#161433"}
            width={width ? width : "350px"}
        >
            {icon}

            <input
                placeholder={placeholder}
                className="px-1 border-0 outline-none focus:outline-none h-10 flex-grow"
                type={type}
                value={value}
                onChange={handleChange}
                name={name}
                disabled={isDisabled}
            />
            {(name === "password" || name == "passwordConfirmation") && (
                <Center
                    className="cursor-pointer"
                    w={"10"}
                    h={"full"}
                    onClick={() => {
                        if (type === "password") {
                            handleEyeClick("text");
                        } else {
                            handleEyeClick("password");
                        }
                    }}
                >
                    {type === "password" ? (
                        <AiFillEye className="text-2xl text-[#161433]" />
                    ) : (
                        <AiFillEyeInvisible className="text-2xl text-[#161433]" />
                    )}
                </Center>
            )}
        </Box>
    )
}


CustomInput.propTypes = {
    icon: PropTypes.element,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    name: PropTypes.string,
    width: PropTypes.string,
    handleEyeClick: PropTypes.func,
    isDisabled: PropTypes.bool
}


export default CustomInput