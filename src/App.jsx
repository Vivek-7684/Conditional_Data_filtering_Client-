
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import Form from '../src/Form.jsx';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Product } from './Product.jsx';
import Layout from './layout/Layout.jsx';

function App() {

  const [updatedProduct, setUpdateProduct] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout updatedProduct={updatedProduct} setUpdateProduct={setUpdateProduct} />}>
          <Route path="/" element={<Product updatedProduct={updatedProduct} setUpdateProduct={setUpdateProduct} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
