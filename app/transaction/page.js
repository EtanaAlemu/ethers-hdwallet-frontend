"use client";
// Import statements should be separated and ordered correctly.
import React, { useState, useEffect,useMemo } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react";
import { API } from "@/utilities/axios";
import useSWR from "swr";


export default function Transaction() {

  // Use useEffect to fetch data after component is mounted.
  // useEffect(() => {
  //   const transaction = async () => {
  //     try {
  //       const transaction = await API.get("/getTransactions");

  //       if (transaction.status === 200) {
  //         setEth(transaction.data.balance);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching balance:", error);
  //     }
  //   };

  //   transaction();
  // }, []); // Empty dependency array means this effect runs once after mount.
  // const rows = [
  //   {
  //     userId: "64dff3de85d309f51b53f9f5",
  //     isTokenTx: true,
  //     value: 1,
  //     toAddress: "0xF4623e04B96dFa4fc2267ac1217FC86966f56752",
  //     blockNumber: 4118919,
  //     txnHash: "0x451aa55fbeffbeacb2c38ea1a0b2524419c0fb6d3e1e86d3ee7b41a533de3b25",
  //     txnFee: 97294588618500,
  //     gasPrice: 1425561738,
  //     method: "Transfer",
  //     id: "64e1391d9b18a56af76e0f11",
  //   },
  // ];

  // const columns = [
  //   {
  //     key: "isTokenTx",
  //     label: "ASSET",
  //   },
  //   {
  //     key: "value",
  //     label: "Amount",
  //   },
  //   {
  //     key: "toAddress",
  //     label: "TO",
  //   },
  //   {
  //     key: "blockNumber",
  //     label: "BLOCK",
  //   },
  //   {
  //     key: "txnHash",
  //     label: "TRANSACTION HASH",
  //   },
  //   {
  //     key: "txnFee",
  //     label: "FEE",
  //   },
  //   {
  //     key: "method",
  //     label: "METHOD",
  //   },
  // ];
let args;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const [page, setPage] = React.useState(1);
  const {data, isLoading} = useSWR(`http://localhost:5000/api/getTransactions?page=${page}`, fetcher, {
    keepPreviousData: true,
  });
  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return rows.slice(start, end);
  // }, [page, rows]);
  console.log(data?.results);
  const loadingState = isLoading || data?.results.transactions.length === 0 ? "loading" : "idle";

  return (
//     <Table aria-label="Example table with client side pagination"
//     bottomContent={
//       <div className="flex w-full justify-center">
//         <Pagination
//           isCompact
//           showControls
//           showShadow
//           color="secondary"
//           page={page}
//           total={pages}
//           onChange={(page) => setPage(page)}
//         />
//       </div>
//     }
//     classNames={{
//       wrapper: "min-h-[222px]",
//     }}
// >
//       <TableHeader>
//         {columns.map((column) => (
//           <TableColumn key={column.key}>{column.label}</TableColumn>
//         ))}
//       </TableHeader>
//       <TableBody>
//         {rows.map((row) => (
//           <TableRow key={row.key}>{(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}</TableRow>
//         ))}
//       </TableBody>
//     </Table>

<Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
      {...args}
    >
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="height">Height</TableColumn>
        <TableColumn key="mass">Mass</TableColumn>
        <TableColumn key="birth_year">Birth year</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.results ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow key={item?.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>

  );
}
