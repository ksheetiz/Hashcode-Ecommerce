import React from 'react'
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import AllProducts from "../../src/components/dashboard/AllProducts";

const allorders = () => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
          <FullLayout>
          <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <AllProducts />
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  )
}

export default allorders