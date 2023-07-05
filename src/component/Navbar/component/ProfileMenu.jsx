import React from "react";
import { Menu,MenuButton, MenuList, MenuItem, VStack, Text, Link, MenuDivider, Button, useColorModeValue, Avatar  } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../redux/reducer/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

export const ProfileMenu = () => {
    const { user } = useSelector((state) => state.UserReducer);
    const navigate = useNavigate()
    const toWritePage = () => {
        navigate("/write-page")
      }
    const toSettingPage = () => {
        navigate("/settings")
      }

      const handleRefresh = () => {
        window.location.reload(); // Refresh the page
      };

      const dispatch = useDispatch()
      const logout = () => { 
      dispatch(userLogout(),
      handleRefresh())
    navigate("/")}

    const [data, setData] = useState("");
    const getData = async() => {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          const respon = await axios.get(
            "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(setData(respon.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      getData();
    }, []);
    return(
        <Menu isLazy>
              <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                <Avatar
                  size="sm"
                  src={data.imgProfile}
                />
              </MenuButton>
              <MenuList
                zIndex={5}
                border="2px solid"
                borderColor={useColorModeValue("pink.700", "pink.100")}
                boxShadow="4px 4px 0"
              >
                <Link
                  _hover={{ textDecoration: "none" }}
                  isExternal
                >
                  <MenuItem>
                    <VStack justify="start" alignItems="left">
                      <Text size="sm" color="gray.500" mt="0 !important">
                        @{data.username}
                      </Text>
                    </VStack>
                  </MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem>
                  <Text _hover={'grey'} cursor={'pointer'} fontWeight="500">Dashboard</Text>
                </MenuItem>
                <MenuItem cursor={'pointer'} onClick={toWritePage}>
                  <Text fontWeight="500">Create Post</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500">Reading List</Text>
                </MenuItem>
                <MenuItem>
                  <Text onClick={toSettingPage} fontWeight="500">Settings</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>
                  <Text fontWeight="500">Sign Out</Text>
                </MenuItem>
              </MenuList>
            </Menu>
    )
}