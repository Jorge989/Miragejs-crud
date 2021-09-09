import { Flex, Input, Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";
export function SearchBox() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="relative"
      bg="gray.50"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        placeholder="Buscar na plataforma"
        px="4"
        mr="4"
        _placeholder={{ color: "gray.500" }}
        ref={searchInputRef}
      ></Input>
      <Icon as={RiSearchLine} fontSize="18" />
    </Flex>
  );
}
