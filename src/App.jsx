
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import Form from '../src/Form.jsx';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Product } from './Product.jsx';

function App() {

  // const [product, setProduct] = useState([]);

  // const [filter, setFilter] = useState({
  //   "name": "",
  //   "maxPrice": "",
  //   "minPrice": "",
  //   "category": ""
  // });

  // const handleChange = (e) => {
  //   console.log(e.target.name);
  //   console.log(e.target.value);
  //   setFilter({ ...filter, [e.target.name]: e.target.value });
  // };



  // const getAllProducts = () => {
  //   api.get('/Product')
  //     .then((res) => setProduct(res.data))
  //     .catch((err) => console.error(err.message))
  // }

  // useEffect(() => getAllProducts(), []);

  // const handleSearch = async () => {

  //   let params = [];

  //   if (filter.name) params.push(`name=${filter.name}`);
  //   if (filter.maxPrice) params.push(`maxPrice=${filter.maxPrice}`);
  //   if (filter.minPrice) params.push(`minPrice=${filter.minPrice}`);
  //   if (filter.category) params.push(`category=${filter.category}`);

  //   const filterProduct = `/Product?${params.join('&')}`;

  //   await api.get(filterProduct)
  //     .then((response) => { setProduct(response.data); console.log(response.data); })
  //     .catch((err) => err.message)
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/Product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
