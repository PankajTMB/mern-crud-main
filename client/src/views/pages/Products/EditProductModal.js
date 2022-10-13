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

export default function EditProductModal({ open, onClose, productId }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");


  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(
          `${apis.baseUrl}/products/${productId}`
        );
        const { name, price, quantity } = data.data;

        setName(name);
        setPrice(price);
        setQuantity(quantity);
      } catch (error) {
        enqueueSnackbar("Unable to get product details", { variant: "error" });
        console.error("Error in getting product details", error);
      }
    };

    if (productId) {
      getProductDetails();
    } else {
      setName("");
      setPrice("");
      setQuantity("");
    }
  }, [productId]);

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      if (!productId) {
        let { data } = await axios.post(`${apis.baseUrl}/products`, {
          name,
          price,
          quantity,
        });

        enqueueSnackbar(data.message, { variant: "success" });
      } else {
        let { data } = await axios.put(
          `${apis.baseUrl}/products/${productId}`,
          {
            name,
            price,
            quantity,
          }
        );

        enqueueSnackbar(data.message, { variant: "success" });
      }
      onClose();
    } catch (error) {
      enqueueSnackbar("Unable to save product", { variant: "error" });
      console.error("Error in saveProduct", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={saveProduct}>
        <DialogTitle>{productId ? "Edit" : "Create"} Product</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Product Name"
              fullWidth
              variant="standard"
              required
            />

            <TextField
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              name="price"
              label="Product Price"
              type="number"
              fullWidth
              variant="standard"
              required
            />

            <TextField
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              name="quantity"
              label="Product Quantity"
              type="number"
              fullWidth
              variant="standard"
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            {productId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
