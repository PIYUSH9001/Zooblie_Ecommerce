import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/context";
import ProductCard from "./ProductCard";
import "../Styles/ProductPage.css"
import { useParams } from "react-router";
import NavigationBar from "./NavigationBar";
import { IsMobileScreen } from "./HomePage";

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
        // console.log(Data);
        return () => {
            setData(null);
        }
    }, [params.category])
    return (
        <div>
            <NavigationBar />
            <ProductPageHeading PageItems={Data ? Data.length : '0'} />
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

const ProductPageHeading = (props) => {
    let prevStr = "https://zooblie-e-commerce.onrender.com/products/category/electronics";
    let targetStr = "https://zooblie-e-commerce.onrender.com/products/category/"
    return (
        <div>
            <h3
                style={
                    {
                        margin: '0.25em',
                        padding: '0.25em',
                        fontSize: '1.4em',
                        textAlign: 'center',
                    }
                }>
                {capitalizeFirstLetter(decodeURI(cutStringAfterSubstring(targetStr,prevStr)))} ({props.PageItems})
            </h3>
            <hr
                style={{
                    color: 'grey',
                    height: 1,
                }}
            />
        </div>
    )
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function cutStringAfterSubstring(mainString, substring) {
    let index = mainString.indexOf(substring);
    if (index === -1) {
        return mainString; // Return the original string if the substring is not found
    }
    return mainString.slice(index + substring.length);
}
export default ProductPage;