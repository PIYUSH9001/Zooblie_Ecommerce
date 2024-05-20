import React, { useContext, useEffect, useState } from "react";
import HomePage from "./HomePage";
import { StoreContext,} from "../Context/context";
import ProductPage from "./ProductsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./CartPage";


const Zooblie = ()=>{
    return(
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/products/category/:category" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage/>}/>
                </Routes>
            </BrowserRouter>
    )
}

export default Zooblie;