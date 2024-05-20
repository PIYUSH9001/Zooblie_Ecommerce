import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/context";
import ProductCard from "./ProductCard";
import "../Styles/ProductPage.css"
import { useParams } from "react-router";
import NavigationBar from "./NavigationBar";

const ProductPage = () => {
    const { Data, FetchData, setData, } = useContext(StoreContext);
    const params = useParams();
    useEffect(() => {
        if (Data) {
            setData(null);
            FetchData(`products/category/${params.category}`);
        }
        else {
            FetchData(`products/category/${params.category}`);
        }
        console.log(Data);
        return ()=>{
            setData(null);
        }
    }, [params.category])
    return (
        <div>
            <NavigationBar />
            <div className="ProductsPage">
                {Data ? (
                    Data.map((product) => (
                        <ProductCard
                            ProductImage={product.image}
                            ProductTitle={product.title}
                            ProductPrice={product.price}
                            ProductDescription={product.description}
                            ProductRating={product.rating.rate}
                            Discounted={false}
                        />
                    ))
                ) : (
                    <div className="LoadingTab">
                        <p>Loading</p>
                        <span className="loader"></span>
                    </div>
                )}
            </div>
        </div>
    );
}
export default ProductPage;