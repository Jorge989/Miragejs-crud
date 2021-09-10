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
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { yupResolver } from "@hookform/resolvers/yup";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
type SignInFormatData = {
  email: string;
  password: string;
  nome: string;
};
interface IEmployee {
  nome: string;
  email: string;
  senha: string;
}
import { Input } from "../components/Input";
import { api } from "../services/api";
const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
  nome: yup.string().required("Nome obrigatório"),
});

export default function Home() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [admins, setAdmins] = useState<IEmployee[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [show, setShow] = React.useState(false);

  const handleClickPassword = () => setShow(!show);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  async (user: IEmployee) => {
    const response = await api.post("users", {
      user: {
        ...user,
        created_at: new Date(),
      },
    });
    console.log(response);
    return response.data.user;
  };
  const handleSignIn: SubmitHandler<SignInFormatData> = async (values) => {
    try {
      const user = {
        email: email,
        password: senha,
        name: nome,
        created_at: new Date(),
      };
      const response = await api.post("todos", user);
      console.log("awui", user);
      console.log("aqui2", response);
      setAdmins(response.data);
      console.log("aqui3", response.data.user);
      return response.data.user;
    } catch (err) {
      console.log("aqui", err);
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
    router.push("/login");
  };
  useEffect(() => {
    api.get(`todos`).then((response) => {
      console.log(response.data);
      setEmployees(response.data);
      console.log("aqui", employees);
    });
  }, [admins]);

  return (
    <Flex
      h="100vh"
      w="100vw"
      align="center"
      justifyContent="space-between"
      flexDirection={["column", "column", "row"]}
    >
      <Flex
        alignItems={["center", "center", "flex-start"]}
        justifyContent="flex-start"
        width="100%"
        flexDirection="column"
        h="100vh"
        paddingTop="39"
        maxWidth={900}
        paddingBottom={["0", "0", "2"]}
        paddingLeft={["0", "0", "10"]}
      >
        <Text
          fontSize={["3xl", "5xl"]}
          ml="3"
          fontWeight="bold"
          color="blue.900"
        >
          Cadastre-se
        </Text>
        <Text
          fontSize={["2xl", "4xl"]}
          ml="3"
          fontWeight="bold"
          color="blue.900"
        >
          Controle todos os seus processos <br /> em uma única plataforma.
        </Text>
      </Flex>
      <Flex
        align={["center", "flex-end"]}
        justifyContent={["center", "flex-start"]}
        h="100vh"
        w="100vw"
        paddingRight={["0", "20"]}
        paddingTop="10"
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
            width={35}
            height={35}
            quality={100}
          />
          <Text fontSize="3xl" ml="3" mb="2" color="gray.900">
            Power App
          </Text>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100%"
          maxWidth={360}
          paddingBottom="2"
        >
          <Text fontSize="2xl" ml="3" mb="2" fontWeight="bold" color="blue.900">
            Cadastre-se agora
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
            label="Nome"
            placeholder="Nome"
            size="md"
            error={errors.nome}
            {...register("nome")}
            onChange={(e) => {
              setNome(e.target.value);
            }}
            mb="2"
            name="nome"
          />
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
            Confirmar
          </Button>
          <Flex justifyContent="center" mt="2" textDecor="none">
            <Link href="/login" passHref color="gray.50">
              Já possui cadastro ?
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
