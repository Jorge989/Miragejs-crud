import {
  Flex,
  Icon,
  FormLabel,
  InputGroup,
  Button,
  Link,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { yupResolver } from "@hookform/resolvers/yup";
import router, { useRouter } from "next/router";
import React from "react";
type SignInFormatData = {
  email: string;
  password: string;
};
import { Input } from "../../components/Input";
const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function Home() {
  const [show, setShow] = React.useState(false);
  const handleClickPassword = () => setShow(!show);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const handleSignIn: SubmitHandler<SignInFormatData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(values);
    router.push("/dashboard");
  };
  return (
    <Flex
      align="center"
      justifyContent="center"
      h="100vh"
      w="100vw"
      flexDirection="column"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth={360}
        paddingBottom="2"
      >
        {" "}
        <Image
          className="imagem"
          src="/logo.png"
          alt="logo"
          width={55}
          height={55}
          quality={100}
        />
        <Text fontSize="5xl" ml="3" mb="2" color="gray.900">
          Power App
        </Text>
      </Flex>

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.900"
        p="8"
        mb="10"
        justifyContent="center"
        borderRadius="8"
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        {" "}
        <Input
          label="E-mail"
          placeholder="E-mail"
          size="md"
          error={errors.email}
          {...register("email")}
          mb="2"
          name="email"
        />
        <FormLabel htmlFor="email" color="white" mb="2">
          Senha
        </FormLabel>
        <InputGroup size="md">
          <Input
            placeholder="Senha"
            size="md"
            error={errors.password}
            {...register("password")}
            name="password"
            mb="2"
            type={show ? "text" : "password"}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              color="blue.400"
              bg="transparent"
              outline="none"
              border="none"
              onClick={handleClickPassword}
            >
              {show ? (
                <Icon as={RiEyeOffFill} fontSize="20" />
              ) : (
                <Icon as={RiEyeFill} fontSize="20" />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          colorScheme="teal"
          size="md"
          mt="4"
          type="submit"
          isLoading={isSubmitting}
        >
          Button
        </Button>
        <Flex justifyContent="center" mt="2" textDecor="none">
          <Link href="/" passHref color="gray.50">
            ainda não possui cadastro ?
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}