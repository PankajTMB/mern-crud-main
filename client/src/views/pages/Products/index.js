import React, { useEffect, useState } from "react";

import { TextField, Box, Button, Grid, Select ,MenuItem,InputLabel} from "@mui/material";
import axios from "axios";

import { apis } from "../../../constants";
import ViewProducts from "./ViewProducts";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { useParams,useNavigate } from "react-router-dom";


export default function Products() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [sortProduct, setSortProduct] = useState("name");
  const [order, setOrder] = useState("assinding");
  const [limit, setLimit] = useState(0);

  const [products, setProducts] = useState([]);



  const getProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${apis.baseUrl}/products?limit=${id}&sort=${sortProduct}&order=${order}`);
      let productsData = data.products.filter((elem)=>{
        if(elem.quantity){
          return elem.quantity = Number(elem.quantity);
        }
        return elem
      });
      setProducts(productsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error in getting products", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [sortProduct,order,limit]);

  
  
  // useEffect(()=>{
  //   setProducts(prevalue=>{
  //     let sortList = prevalue.sort((a,b)=>{
  //         if(a[sortProduct] < b[sortProduct]){
  //           if(order === "assinding" ){
  //             return -1;
  //           }else{
  //             return 1;
  //           }
  //         }
  //         if(a[sortProduct] > b[sortProduct]){
  //           if(order === "assinding" ){
  //             return 1;
  //           }else{
  //             return -1;
  //           }
  //         }
  //     });
      
  //     return[...sortList]
  //   })
  // },[sortProduct,order])

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      mx="auto"
      maxWidth={700}
    >
      <EditProductModal
        open={editProductModalOpen}
        onClose={() => {
          setEditProductId(null);
          setEditProductModalOpen(false);
          getProducts();
        }}
        productId={editProductId}
      />

      <DeleteProductModal
        open={!!deleteProductId}
        onClose={() => {
          setDeleteProductId(null);
          getProducts();
        }}
        productId={deleteProductId}
        setDeleteProductId={setDeleteProductId}
      />

      <Grid item ml="auto" mt={4} mb={3}>
        <Button
          variant="contained"
          onClick={() => setEditProductModalOpen(true)}
        >
          Add Product
        </Button>
        
      </Grid>
      <Grid item ml="auto" mt={4} mb={3}> 
       

        <Select labelId="sort"  label="Sort" value={sortProduct} onChange={(event)=>{setSortProduct(event.target.value);}}>
            <MenuItem value="name">name</MenuItem>
            <MenuItem value="price">price</MenuItem>
            <MenuItem value="quantity">quantity</MenuItem>
            <MenuItem value="createdAt">createdAt</MenuItem>
          </Select>
          <Select labelId="sort"  label="Order" value={order} onChange={(event)=>{setOrder(event.target.value);}}>
            <MenuItem value="assinding">assinding</MenuItem>
            <MenuItem value="decending">decending</MenuItem>
          </Select>
      </Grid>

    <Box>
      <TextField
              onChange={(e) =>{navigate(`/${e.target.value}`);setLimit(e.target.value)} }
              name="limit"
              label="Enter List Limit"
              type="number"
              variant="standard"
              required
            />
    </Box>

      <ViewProducts
        products={products}
        setEditProductId={(productId) => {
          setEditProductId(productId);
          setEditProductModalOpen(true);
        }}
        setDeleteProductId={setDeleteProductId}
      />
    </Grid>
  );
}
