import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const add = () => {
  const [form, setform] = useState({
    title: "",
    slug: "",
    desc: "",
    img: "",
    category: "",
    size: "",
    color: "",
    price: "",
    availableQty: "",
  });

  const onChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    let data = [];
    data.push(form);
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    if (response.success == "success") {
      toast.success("Product Added Successfully ! 😎", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setform({
        title: "",
        slug: "",
        desc: "",
        img: "",
        category: "",
        size: "",
        color: "",
        price: "",
        availableQty: "",
      });
    } else {
      toast.error("Server Error ! Please try again", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add Product">
              <Stack spacing={3}>
                <TextField
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={form.title}
                  onChange={onChange}
                />

                <TextField
                  value={form.slug}
                  onChange={onChange}
                  name="slug"
                  label="Slug"
                  variant="outlined"
                />
                <TextField
                  value={form.img}
                  onChange={onChange}
                  name="img"
                  label="Image Url"
                  variant="outlined"
                />
                <TextField
                  value={form.category}
                  onChange={onChange}
                  name="category"
                  label="Type"
                  variant="outlined"
                />
                <TextField
                  value={form.size}
                  onChange={onChange}
                  name="size"
                  label="Size"
                  variant="outlined"
                />
                <TextField
                  value={form.color}
                  onChange={onChange}
                  name="color"
                  label="Color"
                  variant="outlined"
                />
                <TextField
                  value={form.price}
                  onChange={onChange}
                  name="price"
                  label="Price"
                  variant="outlined"
                />

                <TextField
                  value={form.availableQty}
                  onChange={onChange}
                  name="availableQty"
                  label="Quantity"
                  variant="outlined"
                />

                <TextField
                  name="desc"
                  label="Description"
                  multiline
                  rows={4}
                  value={form.desc}
                  onChange={onChange}
                />
              </Stack>
              <br />
              <Button
                variant="outlined"
                color="primary"
                mt={2}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
};

export default add;
