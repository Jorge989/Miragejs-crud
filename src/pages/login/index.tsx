import {
  Flex,
  Icon,
  FormLabel,
  InputGroup,
  Button,
  InputRightElement,
  Text,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { yupResolver } from "@hookform/resolvers/yup";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
type SignInFormatData = {
  email: string;
  password: string;
};
import { Input } from "../../components/Input";
import { api } from "../../services/api";
const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false);
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
    try {
      const user = {
        email: email,
        password: senha,
      };
      const response = await api.post("auth", user);
      console.log("awui", user);
      console.log("aqui2", response);

      console.log("aqui3", response.data);

      setAuth(true);
      // return response.data.user;
    } catch (err) {
      console.log("aqui", err);
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(values);
    if (auth) {
      router.push("/dashboard");
    } else {
      setError(true);
    }
    // router.push("/dashboard");
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
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
            onChange={(e) => {
              setSenha(e.target.value);
            }}
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
          <Link href="/" passHref>
            ainda não possui cadastro ?
          </Link>
        </Flex>
        <Flex justify="center">
          {" "}
          {error && <Text color="red">Usuário inválido</Text>}
        </Flex>
      </Flex>
    </Flex>
  );
}
