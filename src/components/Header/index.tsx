import { RiMenuLine } from "react-icons/ri";
import { Logo } from "../Header/Logo";
import { Profile } from "../Header/Profile";
import { SearchBox } from "../Header/SearchBox";
import { NotificationsNav } from "../Header/NotificationNav";
import { Flex, useBreakpointValue, IconButton, Icon } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
export function Header() {
  const { onOpen } = useSidebarDrawer();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex as="header" w="100%" maxWidth={1480} mx="auto" mt="4" align="center">
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          mr="2"
          onClick={onOpen}
        ></IconButton>
      )}
      <Logo />
      {isWideVersion && <SearchBox />}
      <Flex align="center" ml="auto" pr="1">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
