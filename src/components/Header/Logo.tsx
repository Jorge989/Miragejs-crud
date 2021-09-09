import { Text, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
export function Logo() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      paddingLeft="7"
      flexDirection="row"
      cursor="pointer"
      mb="2"
    >
      <Link href="/login" passHref>
        <Text
          fontSize={["2xl", "3xl"]}
          fontWeight="bold"
          letterSpacing="tight"
          w="54"
        >
          <Image
            className="imagem"
            src="/logo.png"
            alt="logo"
            width={25}
            height={25}
            quality={100}
          />

          <Text as="span" ml="2" color="gray.800">
            Power App .
          </Text>
        </Text>
      </Link>
    </Flex>
  );
}
