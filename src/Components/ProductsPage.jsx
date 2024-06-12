import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/context";
import ProductCard from "./ProductCard";
import "../Styles/ProductPage.css"
import { useParams } from "react-router";
import NavigationBar from "./NavigationBar";
import { IsMobileScreen } from "./HomePage";

const ProductPage = () => {
    const { Data, FetchData, setData, } = useContext(StoreContext);
    // Some Feature Components
    const ProductPageHeading = (props) => {
        let prevStr = window.location.href;
        let targetStr = "https://zooblie-e-commerce.onrender.com/products/category/"
        return (
            <div>
                <SortComponent />
                <h3
                    style={
                        {
                            margin: '0.25em',
                            padding: '0.25em',
                            fontSize: '1.4em',
                            textAlign: 'center',
                        }
                    }>
                    {capitalizeFirstLetter(decodeURI(cutStringAfterSubstring(prevStr, targetStr)))} ({props.PageItems})
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

    const SortComponent = () => {
        return (
            <select name="SortType" id="SortComponent" onChange={(event) => {
                let ClickedOption = event.target.value;
                console.log(ClickedOption)
                switch (event.target.value) {
                    case "Asc":
                        Data ? setData(sortData(Data, ClickedOption)) : console.log('error');
                        break;
                    case "Desc":
                        Data ? setData(sortData(Data, ClickedOption)) : console.log('error');
                        break;
                    case "LTH":
                        Data ? setData(sortData(Data, ClickedOption)) : console.log('error');
                        break;
                    case "HTL":
                        Data ? setData(sortData(Data, ClickedOption)) : console.log('error');
                        break;
                    case "SBR":
                        Data ? setData(sortData(Data, ClickedOption)) : console.log('error');
                        break;
                }
            }}>
                <option disabled selected value className="SortOptions">Sort by</option>
                <option value="Asc" className="SortOptions">Ascending (A - Z)</option>
                <option value="Desc" className="SortOptions">Descending (Z - A)</option>
                <option value="LTH" className="SortOptions">Price (Lowest - Highest)</option>
                <option value="HTL" className="SortOptions">Price (Highest - Lowest)</option>
                <option value="SBR" className="SortOptions">Ratings</option>
            </select>
        )
    }
    const params = useParams();
    useEffect(() => {
        if (Data) {
            setData(null);
            FetchData(`products/category/${params.category}`);
        }
        else {
            FetchData(`products/category/${params.category}`);
        }

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





const sortData = (Data, SortType) => {
    let sortedData;
    switch (SortType) {
        case 'Asc':
            sortedData = [...Data].sort((a, b) => {
                if (a.title[0] < b.title[0]) {
                    return -1;
                }
                if (a.title[0] > b.title[0]) {
                    return 1;
                }
                return 0;
            });
            return sortedData;
        case 'Desc':
            sortedData = [...Data].sort((a, b) => {
                if (a.title[0] > b.title[0]) {
                    return -1;
                }
                if (a.title[0] < b.title[0]) {
                    return 1;
                }
                return 0;
            });
            return sortedData;
        case 'LTH':
            sortedData = [...Data].sort((a, b) => {
                if (a.price < b.price) {
                    return -1;
                }
                if (a.price > b.price) {
                    return 1;
                }
                return 0;
            });
            return sortedData;
        case 'HTL':
            sortedData = [...Data].sort((a, b) => {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
            });
            return sortedData;
        case 'SBR':
            sortedData = [...Data].sort((a, b) => {
                if (a.rating.rate > b.rating.rate) {
                    return -1;
                }
                if (a.rating.rate < b.rating.rate) {
                    return 1;
                }
                return 0;
            });
            return sortedData;
    }
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