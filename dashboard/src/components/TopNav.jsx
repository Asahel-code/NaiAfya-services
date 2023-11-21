import PropTypes from "prop-types";
import { Box, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useUserStore } from "../utils/zustand/Store";
import { toastProps } from "../utils/toastProps";

const TopNav = ({toggleSideBar}) => {
  const toast = useToast();
  const [showDropDown, setShowDropDown] = useState(false);
  const removeUser = useUserStore((state) => state.removeUser);
  const user = useUserStore((state) => state.user);

  const logout = () => {
    removeUser();
    toast({
      ...toastProps,
      description: "Logged out successfully",
      status: "success"
    });
  }

  return (
    <div className="h-[60px] bg-white flex justify-between">
      <button
                className={"p-1 rounded-md focus:outline-none"}
                onClick={toggleSideBar}
            >
                <BiMenuAltLeft className="text-4xl" />
            </button>

      {/* nav items */}
      <div className="flex items-center gap-2  pr-5">
        <div>
          <div
            className="relative"
            onMouseEnter={() => setShowDropDown(true)}
            onMouseLeave={() => setShowDropDown(false)}
          >
            <button>
              <span className="">
                <AiOutlineUser className="text-4xl" />
              </span>
            </button>
            {showDropDown && (
              <Box boxShadow='sm' rounded='md' bg='white' className="absolute w-[150px] lg:right-2">
                  <Box className="px-4 py-2 text-secondary_color font-semibold text-lg border-b-2">
                    {user?.username}
                  </Box>
                <Link to="/my_profile">
                  <Box className="px-4 py-2 hover:bg-gray-100 hover:text-secondary_color hover:font-medium text-md">
                    Profile
                  </Box>
                </Link>
                <Box
                  cursor={"pointer"}
                  className="px-4 py-2 hover:text-secondary_color hover:bg-gray-100 hover:font-medium text-md font-bold"
                  onClick={() => logout()}
                >
                  logout
                </Box>
              </Box>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

TopNav.propTypes = {
  toggleSideBar: PropTypes.func.isRequired
}

export default TopNav