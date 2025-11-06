import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import api from './api/api.js';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { productSchemaForFilter } from '../validation.js';
import { Stack, Alert } from '@mui/material';
// import { Product } from './Product.jsx';

export default function Form({ updatedProduct, setUpdateProduct }) {

    const Navigate = useNavigate();

    const [filter, setFilter] = useState({}); // form data
    const [error, setError] = useState({}); // real time error

    const [alert, setAlert] = useState({  // alert messages
        show: false,
        type: "",
        messages: []
    });

    const handleChange = (e) => {

        // validation only when user type data 
        if (e.target.value.trimStart() === "") {
            e.target.value = "";
        }

        if (e.target.value.trim() === "") {
            setFilter({ ...filter, [e.target.name]: undefined });

            const newErrors = { ...error };
            delete newErrors[e.target.name]; //remove only that field error
            setError(newErrors);

            return; //  no validation for empty 
        }

        const updatedFields = { ...filter, [e.target.name]: e.target.value };
        setFilter(updatedFields);

        console.log(updatedFields);

        const result = productSchemaForFilter.safeParse(updatedFields);
        console.log(result);

        if (!result.success) {
            setError(result.error.flatten().fieldErrors);
        } else {
            setError({});
        }
    };

    useEffect(() => {
        if (updatedProduct.length > 0) {
            setFilter(updatedProduct[0]);
        }
    }, [updatedProduct]);

    console.log(filter);

    const handleSearch = () => {
        let params = [];

        if (filter.name) params.push(`name=${filter.name}`);
        if (filter.maxPrice) params.push(`maxPrice=${filter.maxPrice}`);
        if (filter.minPrice) params.push(`minPrice=${filter.minPrice}`);
        if (filter.category) params.push(`category=${filter.category}`);

        const filterProduct = `/?${params.join('&')}`;
        Navigate(filterProduct);
    };

    const handleAdd = () => {
        console.log("A");
        api.post("/AddProduct", filter)
            .then(() => {
                setAlert({
                    show: true,
                    type: "success",
                    messages: ["Product added successfully"]
                });

                setTimeout(() => {
                    setAlert({ show: false, type: "", messages: [] });
                    Navigate(0);
                }, 3000);
            })
            .catch((err) => {

                let messages = [];

                if (Array.isArray(err.response.data)) {
                    messages = err.response.data.map((errmsg) => errmsg.msg);
                } else {
                    messages = [err.response.data];
                }

                setAlert({
                    show: true,
                    type: "error",
                    messages
                });

                setTimeout(() => {
                    setAlert({ show: false, type: "", messages: [] });
                }, 3000);


            });
    };

    const updateProduct = (id, filter) => {
        api.put(`/updateProduct/${id}`, filter)
            .then(() => {
                setAlert({
                    show: true,
                    type: "success",
                    messages: ["Product updated successfully"]
                });

                setTimeout(() => {
                    setAlert({ show: false, type: "", messages: [] });
                    Navigate(0);
                }, 3000);
            })
            .catch((err) => {

                let messages = [];

                if (Array.isArray(err.response.data)) {
                    messages = err.response.data.map((errmsg) => errmsg.msg);
                } else {
                    messages = [err.response.data];
                }

                setAlert({
                    show: true,
                    type: "error",
                    messages
                });

                setTimeout(() => {
                    setAlert({ show: false, type: "", messages: [] });
                }, 3000);


            });
    };

    return (
        <>

            <Box sx={{ width: '40vw', height: '80vh', px: 2, display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                {alert.show &&
                    alert.messages.map((msg, idx) => (
                        <Alert
                            key={idx}
                            severity={alert.type}
                            sx={{ m: 2, width: "40vw", position: "absolute", top: 1, left: 10 }}
                            onClose={() => setAlert({ show: false, type: "", messages: [] })}
                        >
                            {msg}
                        </Alert>
                    ))
                }
                <form>
                    <Typography variant='h5'>Products</Typography>

                    <TextField
                        error={error?.name}
                        helperText={error?.name?.join(".")}
                        value={filter?.name || ""}
                        label="name"
                        name="name"
                        margin="normal"
                        onChange={handleChange}
                        variant='outlined'
                        fullWidth
                    />

                    <TextField
                        error={error?.maxPrice}
                        helperText={error?.maxPrice?.join(".")}
                        value={filter?.maxPrice || ""}
                        type='number'
                        name="maxPrice"
                        label="MaxPrice"
                        margin="normal"
                        onChange={handleChange}
                        variant='outlined'
                        fullWidth
                    />

                    <TextField
                        error={error?.minPrice}
                        helperText={error?.minPrice?.join(".")}
                        value={filter?.minPrice || ""}
                        type='number'
                        name="minPrice"
                        label="MinPrice"
                        margin="normal"
                        onChange={handleChange}
                        variant='outlined'
                        fullWidth
                    />

                    <TextField
                        error={error?.category}
                        helperText={error?.category?.join(".")}
                        value={filter?.category || ""}
                        select
                        label="category"
                        name="category"
                        margin="normal"
                        variant='outlined'
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Cloth">Cloth</MenuItem>
                        <MenuItem value="Accessories">Accessories</MenuItem>
                        <MenuItem value="Sports">Sports</MenuItem>
                    </TextField>

                    <Stack direction={"row"} gap="1rem" sx={{ mt: 1 }}>
                        <Button
                            disabled={Object.keys(error).length > 0}
                            variant='contained'
                            fullWidth
                            onClick={handleSearch}
                        >
                            Get Product
                        </Button>

                        <Button
                            disabled={Object.keys(error).length > 0}
                            variant='contained'
                            fullWidth
                            onClick={() => { updatedProduct.length > 0 ? updateProduct(updatedProduct[0]?.id, filter) : handleAdd() }}
                        >
                            {updatedProduct.length > 0 ? "Edit Product" : "Add Product"}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </>
    );
}
