import { GetStaticProps } from "next";
import {
  Box,
  Flex,
  Text,
  Heading,
  Divider,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm, SubmitHandler, appendErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Input";
import Link from "next/link";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { ActiveModelSerializer } from "miragejs";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

type CreateUserFormData = {
  name: string;
  email: string;
  password_confirmation: string;
  password: string;
};
interface IEmployee {
  nome: string;
  email: string;
  senha: string;
}
const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigátorio").email("E-mail inválido"),
  password: yup.string().required("Senha obrigátoria"),
  password_confirmation: yup
    .string()
    .required("Senha obrigatória")
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export const getUser = async (userId: string) => {
  const users = await api.get(`todos/${userId}`).then(({ data }) => {
    return data;
  });
  return users;
};
export default function CreateUser() {
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [admins, setAdmins] = useState<IEmployee[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [show, setShow] = React.useState(false);
  const handleClickPassword = () => setShow(!show);

  const cerateUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });
      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const handleEditUser: SubmitHandler<CreateUserFormData> = async (values) => {
    try {
      const user = {
        email: email,
        password: senha,
        name: nome,
        created_at: new Date(),
      };
      const response = await api.post("users", user);
      console.log("awui", user);
      console.log("aqui2", response);
      setAdmins(response.data);
      console.log("aqui3", response.data.user);

      return response.data.user;
    } catch (err) {
      console.log("aqui", err);
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
  };
  //   router.push("/dashboard");

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["6", "8"]}>
        <Sidebar />
        <Box
          as="form"
          onSubmit={handleSubmit(handleEditUser)}
          flex="1"
          borderRadius={8}
          bg="gray.50"
          p="8"
        >
          <Heading size="lg" fontWeight="normal" color="gray.900">
            Editar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              alignItems="center"
              w="100%"
            >
              <Flex flexDirection="column">
                {" "}
                <Text color="gray.900" fontSize="19" fontWeight="400">
                  Nome Completo
                </Text>
                <Input
                  mt="1"
                  color="gray.900"
                  name="name"
                  placeholder="nome"
                  {...register("name")}
                  error={errors.name}
                />
              </Flex>
              <Flex flexDirection="column">
                <Text color="gray.900" fontSize="19" fontWeight="400">
                  E-mail
                </Text>
                <Input
                  name="email"
                  mt="1"
                  color="gray.900"
                  type="email"
                  placeholder="e-mail"
                  error={errors.email}
                  {...register("email")}
                />
              </Flex>
            </SimpleGrid>

            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              w="100%"
              alignItems="center"
            >
              <Flex flexDirection="column">
                {" "}
                <Text color="gray.900" fontSize="19" fontWeight="400">
                  Senha
                </Text>
                <InputGroup size="md">
                  <Input
                    name="password"
                    {...register("password")}
                    placeholder="senha"
                    color="gray.900"
                    error={errors.password}
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
              </Flex>
              <Flex flexDirection="column">
                {" "}
                <Text color="gray.900" fontSize="19" fontWeight="400">
                  Confirmar Senha
                </Text>
                <InputGroup size="md">
                  <Input
                    name="password_confirmation"
                    placeholder="confirmar senha"
                    color="gray.900"
                    {...register("password_confirmation")}
                    error={errors.password_confirmation}
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
              </Flex>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              {" "}
              <Link href="/dashboard" passHref>
                <Button as="a" colorScheme="blackAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                isLoading={formState.isSubmitting}
                type="submit"
                colorScheme="blue"
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
export const getStaticPaths: GetStaticProps = async ({ params }) => {
  const { data } = await api.get(`todos/${params}`);
  // const router = useRouter();
  // console.log(router.query);
  // const userid = router.query;
  console.log(params);
  // const usuararios = await getUser(params.id as string);

  const paths = data.map((usuario) => ({
    params: { id: usuario.id },
  }));
  return {
    props: {
      // usuararios,
      // user: usuararios.email,
    },
  };
};
