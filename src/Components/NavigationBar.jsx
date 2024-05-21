import React, { useContext, useState } from "react";
import "../Styles//HomePage.css";
import SearchIcon from "../Icons/SearchIcon.png";
import ThailaIcon from "../Icons/thaila.png";
import { StoreContext } from "../Context/context";
import { useNavigate } from "react-router";

const NavigationBar = () => {
    // Creating some variables for some features
    const [visible, setvisible] = useState(false);
    const { FetchData, Data } = useContext(StoreContext);
    const navigate = useNavigate();
    const MakeBtnOnHover = (event) => {
        event.target.style.backgroundColor = "black";
        event.target.style.color = "white";
    };
    const MakeBtnOnMouseOver = (event) => {
        event.target.style.backgroundColor = "white";
        event.target.style.color = "black";
    };
    // Categories Array
    const Categories = [
        "Electronics",
        "Jewellery",
        "Men's clothing",
        "Women's clothing"
    ];
    return (
        <nav className="NavigationBar">
            {/* Home Button */}
            <li className="NavOptions" >
                <button
                    onClick={() => {
                        // window.location.href = ("/")
                        navigate("/");
                    }}
                    className="NavButtons"
                    onMouseOver={MakeBtnOnHover}
                    onMouseOut={MakeBtnOnMouseOver}>
                    Home
                </button>
            </li>
            {/* Categories Button */}
            <li className="NavOptions"
                style={
                    {
                        zIndex: 3,
                        borderRadius: '2em'
                    }
                }>
                <button
                    onMouseEnter={() => {
                        setvisible(true);
                    }}
                    onMouseOver={MakeBtnOnHover}
                    onMouseOut={MakeBtnOnMouseOver}
                    className="NavButtons"
                >Categories
                </button>
            </li>
            <div
                className="CategoriesTab"
                style={
                    {
                        visibility: visible ? 'visible' : 'hidden'
                        , opacity: visible ? '1' : '0'
                    }}
                onMouseLeave={(event) => {
                        setvisible(false);
                }}>
                <ul>
                    {Categories.map((item) => {
                        return <li
                            className="CategoryItems"
                            onClick={() => {
                                if (item.toLowerCase() === "jewellery") {
                                    navigate(encodeURI('/products/category/jewelery'));
                                }
                                else {
                                    navigate(encodeURI(`/products/category/${item.toLowerCase()}`));
                                }
                            }}>{item}</li>
                    })}
                </ul>
            </div>
            {/* Search Tab */}
            {/* <li className="NavOptions NavSearchDiv">
                <input type="text" className="NavSearchInput" />
                <button className="SearchBtn"><img src={SearchIcon} alt="" /></button>
            </li> */}
            {/* Wishlist */}
            {/* <li className="NavOptions">
                <button className="NavButtons"
                    onMouseOver={MakeBtnOnHover}
                    onMouseOut={MakeBtnOnMouseOver}>
                    Wishlist
                </button>
            </li> */}
            {/* Cart Tab */}
            <li className="NavOptions"><img src={ThailaIcon} alt=""
                style={
                    {
                        height: '2.5em',
                        width: '2.5em',
                        backgroundColor: 'white',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '0.125em',
                        transition: '0.5s',
                        cursor: 'pointer',
                    }
                }
                onMouseOver={(event) => {
                    event.target.style.backgroundColor = "lightgray";
                }}
                onMouseOut={(event) => {
                    event.target.style.backgroundColor = "white";
                }}
                onClick={() => {
                    navigate("/cart")
                }}
            />
            </li>
        </nav>
    );
};

export default NavigationBar;
