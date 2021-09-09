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
type CreateUserFormData = {
  name: string;
  email: string;
  password_confirmation: string;
  password: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigátorio").email("E-mail inválido"),
  password: yup.string().required("Senha obrigátoria"),
  password_confirmation: yup
    .string()
    .required("Senha obrigatória")
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});
export default function CreateUser() {
  const router = useRouter();
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
  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await cerateUser.mutateAsync(values);
    router.push("/dashboard");
  };
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["6", "8"]}>
        <Sidebar />
        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.50"
          p="8"
        >
          <Heading size="lg" fontWeight="normal" color="gray.900">
            Criar usuário
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
                <Input
                  name="password"
                  {...register("password")}
                  placeholder="senha"
                  color="gray.900"
                  error={errors.password}
                />
              </Flex>
              <Flex flexDirection="column">
                {" "}
                <Text color="gray.900" fontSize="19" fontWeight="400">
                  Confirmar Senha
                </Text>
                <Input
                  name="password_confirmation"
                  type="password"
                  placeholder="confirmar senha"
                  color="gray.900"
                  {...register("password_confirmation")}
                  error={errors.password_confirmation}
                />
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
