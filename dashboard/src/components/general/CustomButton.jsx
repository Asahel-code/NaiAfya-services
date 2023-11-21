import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

const CustomButton = ({ text, fontSize, handleClick, variant, type, width, height, ...rest }) => {
    return (
        <Box
            as='button'
            type={type}
            width={width}
            height={height ? height : "50px"}
            lineHeight='1.2'
            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            px='10px'
            fontSize={fontSize ? fontSize : "16px"}
            fontWeight='semibold'
            _active={{
                transform: 'scale(0.98)',
            }}
            onClick={handleClick}
            {...rest}
            className={`rounded-md hover:scale-105 transition-all  ${variant === "solid" ?
                `bg-primary_color text-white hover:bg-primary_color` :
                variant === "outline" ?
                    `bg-white text-primary_color border-2 border-primary_color hover:text-primary_color hover:border-primary_color`
                    : variant === "danger" &&
                    `bg-white text-primary_red border-2 border-primary_red hover:text-primary_red hover:border-primary_red`}`}
        >
            <Box className='flex justify-center items-center gap-2'>
                {text}
            </Box>
        </Box>


    )
}

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    fontSize: PropTypes.string,
    handleClick: PropTypes.func,
    variant: PropTypes.string.isRequired,
    type: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
}

export default CustomButton