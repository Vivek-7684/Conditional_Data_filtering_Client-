import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableFooter from '@mui/material/TableFooter';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';


function App() {

  const [product, setProduct] = useState([]);

  const [filter, setFilter] = useState({
    "name": "",
    "maxPrice": "",
    "minPrice": "",
    "category": ""
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const api = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })


  const getAllProducts = () => {
    api.get('/Product')
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err.message))
  }

  useEffect(() => getAllProducts(), []);

  const handleSearch = async () => {

    let params = [];

    if (filter.name) params.push(`name=${filter.name}`);
    if (filter.maxPrice) params.push(`maxPrice=${filter.maxPrice}`);
    if (filter.minPrice) params.push(`minPrice=${filter.minPrice}`);
    if (filter.category) params.push(`category=${filter.category}`);

    const filterProduct = `/Product?${params.join('&')}`;

    await api.get(filterProduct)
      .then((response) => { setProduct(response.data); console.log(response.data); })
      .catch((err) => err.message)
  }

  return (
    <Box sx={{
      display: "flex", justifyContent: "center", alignItems: "center", width: '90vw', height: '100vh', py: 10, px: 3, gap: '3rem'
    }}>
      <form>
        <Typography variant='h5'>Select Filter</Typography>
        <TextField label="name" name="name" margin="normal" onChange={(e) => handleChange(e)} variant='outlined' fullWidth />
        <TextField type='number' name="maxPrice" label="MaxPrice" margin="normal" onChange={(e) => handleChange(e)} variant='outlined' fullWidth />
        <TextField type='number' name="minPrice" label="MinPrice" margin="normal" onChange={(e) => handleChange(e)} variant='outlined' fullWidth />
        <TextField select label="category" name="category" value={filter.category} margin="normal" variant='outlined' onChange={(e) => handleChange(e)} fullWidth >
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Cloth">Cloth</MenuItem>
          <MenuItem value="Accessories">Accessories</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
        </TextField>

        <Button variant='contained' fullWidth sx={{ p: 1 }} onClick={() => handleSearch()}>Get Product</Button>
      </form>

      <Stack sx={{ width: "70vw" }}>
        <TableContainer sx={{ width: "70vw", height: "70vh" }}>
          <Typography variant='h5'>My Products</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>MaxPrice</strong></TableCell>
                <TableCell><strong>MinPrice</strong></TableCell>
                <TableCell><strong>Catgory</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {product.map((data) => {
                return (
                  <TableRow key={data.name}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.maxPrice}</TableCell>
                    <TableCell>{data.minPrice}</TableCell>
                    <TableCell>{data.category}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant='contained' fullWidth sx={{ p: 1 }} onClick={() => { getAllProducts(); }}>Get All Products</Button>
      </Stack>


    </Box >
  )
}

export default App
