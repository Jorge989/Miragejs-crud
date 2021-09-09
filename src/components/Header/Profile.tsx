import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center" pr="5">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Usuário Master</Text>
          <Text color="gray.300" fontSize="small">
            usuario@gmail.com
          </Text>
        </Box>
      )}
      <Avatar size="md" name="Usuário Master" />
    </Flex>
  );
}
