import PropTypes from "prop-types";
import { Box, Spinner, Text } from "@chakra-ui/react";

const LoadingButton = ({ width, height, fontSize, ...rest }) => {
    return (
        <Box
            cursor={"pointer"}
            borderRadius={"md"}
            className={"bg-white text-primary_color_faded border-2 border-primary_color_faded"}
            lineHeight='1.2'
            width={width ? width : "full"}
            height={height ? height : "50px"}
            fontSize={fontSize ? fontSize : "16px"}
            fontWeight='semibold'
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            {...rest}
        >
            <Spinner
                thickness={'2px'}
                emptyColor={'gray.200'}
                color={'#A79AF5'}
                size={'md'}
            />
            <Text>Loading</Text>
        </Box>
    );
};

LoadingButton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    fontSize: PropTypes.string
}

export default LoadingButton;