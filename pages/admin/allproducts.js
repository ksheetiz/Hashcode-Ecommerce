import React from 'react'
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import AllProducts from "../../src/components/dashboard/AllProducts";
import Product from "@/models/Product";
import mongoose from 'mongoose';

const allproducts = ({products}) => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
          <FullLayout>
          <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <AllProducts products={products}/>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}

export default allproducts

export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find();

  return {props : {products : JSON.parse(JSON.stringify(products))}}
}