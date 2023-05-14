import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import AllProducts from "../../src/components/dashboard/AllProducts";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Product from "@/models/Product";
import AdminTok from "@/models/AdminTok";
import mongoose from 'mongoose';
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function Index({products,adminCheck,user}) {
  const router = useRouter();
  useEffect(() => {
    if(!user.admin){
      router.push('/');
    }
    if(!adminCheck){
      router.push('/');
    }
  }, [])
  
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
          <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <DailyActivity />
        </Grid>
        <Grid item xs={12} lg={8}>
          <AllProducts products={products} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <BlogCard />
        </Grid>
      </Grid>
      </FullLayout>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }
  let adminCheck = false;

  let products = await Product.find();

  products = products.slice(0,4);

  let adminTok = await AdminTok.findOne({token : context.query.token});

  if(adminTok === context.query.token)
    adminCheck = true;

  return {props : {products : JSON.parse(JSON.stringify(products)), adminCheck}}
}