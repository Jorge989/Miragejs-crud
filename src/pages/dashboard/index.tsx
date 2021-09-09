import { Header } from "../../components/Header";
import dynamic from "next/dynamic";
import { Pagination } from "../../components/Pagination";

import {
  Flex,
  SimpleGrid,
  Box,
  Checkbox,
  Text,
  Button,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  Spinner,
  Table,
  theme,
  Icon,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Sidebar } from "../../components/Sidebar";
import { RiAddLine, RiPencilFill } from "react-icons/ri";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      dataLabels: {
        enabled: false,
      },
      xavis: {
        type: "datetime",
        axisBorder: {
          color: theme.colors.gray[600],
        },
        axisTicks: {
          color: theme.colors.gray[600],
        },
        categories: [
          "2021-03-18T00:00:00.000Z",
          "2021-03-19T00:00:00.000Z",
          "2021-03-20T00:00:00.000Z",
          "2021-03-21T00:00:00.000Z",
          "2021-03-22T00:00:00.000Z",
          "2021-03-23T00:00:00.000Z",
          "2021-03-24T00:00:00.000Z",
        ],
      },
      fill: {
        opacity: 0.3,
        type: "gradient",
        gradient: {
          shade: "dark",
          opacityFrom: 0.7,
          opcityTo: 0.3,
        },
      },
    },
  };
  const series = [
    {
      name: "series1",
      data: [31, 120, 10, 28, 61, 18, 29],
    },
  ];
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid flex="1" gap="4" minChildWidth="320px">
          <Flex flexDirection="column">
            <Box p={["6", "8"]} bg="gray.50" borderRadius={8}>
              <Text fontSize="lg" mb="4" color="gray.900">
                Inscritos da semana
              </Text>
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Box>
            <Box flex="1" borderRadius={8} bg="gray.50" p="8" mt="2">
              <Flex mb="8" justify="space-between" align="center">
                <Heading size="lg" fontWeight="normal" color="gray.900">
                  Usuários
                </Heading>
                <Link href="/users/create" passHref>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="teal"
                    cursor="pointer"
                    leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                  >
                    Criar novo
                  </Button>
                </Link>
              </Flex>
              {isLoading ? (
                <Flex justify="center">
                  <Spinner />
                </Flex>
              ) : error ? (
                <Flex justify="center">
                  <Text color="gray.900">
                    Falha ao obter dados dos usuários.
                  </Text>
                </Flex>
              ) : (
                <>
                  <Table colorScheme="messenger">
                    <Thead>
                      <Tr w={["0", "4", "8"]}>
                        <Th px={["4", "4,", "6"]} color="gray.300" w="8"></Th>
                        <Th color="gray.900">Usuários</Th>
                        {!isLoading && isFetching && (
                          <Spinner size="sm" color="gray.500" ml="4" />
                        )}
                        {isWideVersion && (
                          <Th color="gray.900">Data de cadastro</Th>
                        )}
                        <Th color="gray.900" w="8"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.users.map((user) => {
                        return (
                          <Tr color="gray.900" key={user.id}>
                            <Td px={["4", "4,", "6"]}>
                              <Checkbox colorScheme="blue"></Checkbox>
                            </Td>
                            <Td px={["4", "4,", "6"]}>
                              <Box>
                                <Text fontWeight="bold">{user.name}</Text>
                                <Text fontSize="sm">{user.email}</Text>
                              </Box>
                            </Td>
                            {isWideVersion && <Td>{user.createdAt}1</Td>}
                            <Td px={["4", "4,", "6"]}>
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="twitter"
                                cursor="pointer"
                                leftIcon={
                                  <Icon as={RiPencilFill} fontSize="17" />
                                }
                              >
                                Editar
                              </Button>
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                  <Pagination
                    totalCountOfRegister={data.totalCount}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </>
              )}
            </Box>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1);
//   return {
//     props: {},
//   };
// };
