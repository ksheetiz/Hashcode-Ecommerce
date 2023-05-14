import React from 'react'
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const imageuploader = () => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
          <FullLayout>
        <div>Hello Products</div>
      </FullLayout>
    </ThemeProvider>
  )
}

export default imageuploader