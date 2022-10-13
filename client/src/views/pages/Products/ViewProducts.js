import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Stack } from "@mui/system";



export default function ViewProducts({
  products,
  setEditProductId,
  setDeleteProductId,
}) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell component="th" sx={{ fontWeight: "900" }}>
              Product Name
            </TableCell>
            <TableCell sx={{ fontWeight: "900" }}>Price</TableCell>
            <TableCell sx={{ fontWeight: "900" }}>Quantity</TableCell>
            <TableCell sx={{ fontWeight: "900" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map(({ _id, name, price, quantity }) => (
            <TableRow key={_id}>
              <TableCell component="td" scope="row">
                {name}
              </TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ marginRight: 1 }}
                  onClick={() => setEditProductId(_id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => setDeleteProductId(_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
