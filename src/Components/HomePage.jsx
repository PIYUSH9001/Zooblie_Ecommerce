import React, { useContext, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import BannerTab from "./BannerTab";
import { StoreContext } from "../Context/context";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
const DiscountProducts = [];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function IsMobileScreen(){
    if(window.innerWidth<=750){
        return true;
    }
    else{
        return false;
    }
}

const HomePage = () => {
    const { Data, FetchData, setData,} = useContext(StoreContext);
    const navigate = useNavigate();
    const MobileScreen = IsMobileScreen();
    useEffect(() => {
        let RandomProduct;
        FetchData("products");
        // console.log(Data);
        for (let i = 0; i < (IsMobileScreen()?4:3); i++) {
            RandomProduct = getRandomInt(0, 19);
            if (i === 0) {
                DiscountProducts.push(RandomProduct);
            }
            else if (i === 1) {
                while (RandomProduct === DiscountProducts[0]) {
                    RandomProduct = getRandomInt(0, 19);
                }
                DiscountProducts.push(RandomProduct);
            }
            else {
                while ((RandomProduct === DiscountProducts[0] || RandomProduct === DiscountProducts[1])) {
                    RandomProduct = getRandomInt(0, 19);
                }
                DiscountProducts.push(RandomProduct);
            }
        }
        return () => {
            DiscountProducts.splice(0,3);
            setData(null);
        }
    }, [])
    return (
        <div className="Container">
            <NavigationBar />
            <BannerTab />
            <div className="DiscountTab">
                <h3 style={
                    {
                        textAlign:'center',
                        fontSize:'1.75em',
                        color:'red',
                        padding:'0.5em'
                        
                    }
                    }>Limited Time Discount</h3>
                <div className="DiscountItems">
                    {Data ? (
                        <>
                            {
                                DiscountProducts.map((DiscountedProducts) => {
                                    return (
                                        <ProductCard
                                            ProductImage={Data[DiscountedProducts].image}
                                            ProductTitle={Data[DiscountedProducts].title}
                                            ProductPrice={Data[DiscountedProducts].price}
                                            ProductDescription={Data[DiscountedProducts].description}
                                            ProductRating={Data[DiscountedProducts].rating.rate}
                                            Discounted={true}
                                        />
                                    )
                                })
                            }
                        </>
                    ) :(
                        <div className="LoadingArea">
                        {window.inner}
                        {!MobileScreen?(
                            <p style={
                                {
                                    padding:'0.4em',
                                    margin:'0.5em',
                                    fontWeight:'bold',
                                }
                                }>Loading</p>
                        ):null}
                        <span className="loader"></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage;