import PropTypes from "prop-types";
import { useState } from 'react';
import SideNav from "./SideNav";
import TopNav from "./TopNav";

const Layout = ({ children }) => {
    const [showSideBar, setShowSideBar] = useState(true);
    const handleToggle = () => {
        setShowSideBar((prev) => !prev);
    };
    return (
        <div className="flex flex-row h-screen bg-gray-200">
            <SideNav show={showSideBar} />

            <div className="min-h-full w-[100%]">
                <TopNav toggleSideBar={handleToggle} />
                {children}
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout