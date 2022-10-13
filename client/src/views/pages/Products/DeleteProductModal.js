import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";

import { apis } from "../../../constants";

export default function DeleteProductModal({ open, onClose, productId }) {
  const { enqueueSnackbar } = useSnackbar();

  const deleteProduct = async (e) => {
    try {
      let { data } = await axios.delete(
        `${apis.baseUrl}/products/${productId}`
      );

      enqueueSnackbar(data.message, { variant: "success" });
      onClose();
    } catch (error) {
      enqueueSnackbar("Unable to delete product", { variant: "error" });
      console.error("Error in deleteProduct", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this product?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={deleteProduct}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
