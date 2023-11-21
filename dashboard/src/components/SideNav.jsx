import PropTypes from "prop-types";
import { useState } from 'react';
import { MdOutlineDashboard, } from "react-icons/md";
import { FaHospitalSymbol } from "react-icons/fa";
import { BiSolidAmbulance } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Center } from "@chakra-ui/react";

const SideNav = ({ show }) => {

    const navigate = useNavigate();
    const [current, setCurrent] = useState("/");

    const handleCurrent = (selected, to) => {
        setCurrent(selected.toLowerCase());
        if (to !== "") navigate(to);
    }

    return (
        <div className={`w-[200px] h-screen ${!show && "hidden"} ease-in-out bg-secondary_color shrink-0 shadow-md`}>
            {/* Logo */}
            <Link to="/">
                <Center>
                    <div className="flex flex-col items-start py-3 text-xl md:text-4xl font-bold mb-6">
                        <span className="text-primary_color">Tiba </span>
                        <h3 className="text-white">Connect</h3>
                    </div>
                </Center>

            </Link>

            {/* Nav Items */}
            <div className="flex flex-col gap-5 p-2">
                {menu_list.map((menu, key) => (
                    <MenuItem
                        key={key}
                        icon={menu.icon}
                        title={menu.name}
                        isCurrent={menu.name.toLowerCase() === current}
                        handleClick={() => handleCurrent(menu.name, menu?.to)}
                    />
                ))}
            </div>
        </div>
    )
}

SideNav.propTypes = {
    show: PropTypes.bool.isRequired
}

export default SideNav

const MenuItem = ({
    icon,
    title,
    isCurrent,
    handleClick,
}) => (
    <div className="w-full py-1">
        <div className={`cursor-pointer rounded-md ${isCurrent ? "text-white bg-primary_color" : "text-white"} w-full hover:text-white hover:bg-primary_color`} onClick={handleClick}>
            <div className="flex items-center gap-2 h-10 px-2">
                <div className={`text-lg`}>
                    {icon}
                </div>
                <div className="text-md">
                    {title}
                </div>
            </div>
        </div>
    </div>
);

MenuItem.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    isCurrent: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
}

const menu_list = [
    {
        name: "Dashboard",
        to: "/",
        icon: <MdOutlineDashboard />
    },
    {
        name: "Hospitals",
        to: "/hospitals",
        icon: <FaHospitalSymbol />
    },
    {
        name: "Ambulance",
        to: "/ambulances",
        icon: <BiSolidAmbulance />
    },
]