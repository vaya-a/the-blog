import React from "react";
import { Menu,MenuButton, MenuList, MenuItem, VStack, Text, Link, MenuDivider, Button, useColorModeValue, Avatar  } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/reducer/UserReducer";
import { useDispatch } from "react-redux";

export const ProfileMenu = () => {
    const navigate = useNavigate()
    const toWritePage = () => {
        navigate("/write-page")
      }
    const toSettingPage = () => {
        navigate("/settings")
      }
      const dispatch = useDispatch()
      const logout = () => { 
      dispatch(userLogout())}
    return(
        <Menu isLazy>
              <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                <Avatar
                  size="sm"
                  src={"https://avatars2.githubusercontent.com/u/37842853?v=4"}
                />
              </MenuButton>
              <MenuList
                zIndex={5}
                border="2px solid"
                borderColor={useColorModeValue("pink.700", "pink.100")}
                boxShadow="4px 4px 0"
              >
                <Link
                  href="https://dev.to/m_ahmad"
                  _hover={{ textDecoration: "none" }}
                  isExternal
                >
                  <MenuItem>
                    <VStack justify="start" alignItems="left">
                      <Text fontWeight="500">Unkown User</Text>
                      <Text size="sm" color="gray.500" mt="0 !important">
                        @unknown_user
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