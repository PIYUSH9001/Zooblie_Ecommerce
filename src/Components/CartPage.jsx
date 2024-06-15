import React, { useContext } from "react";
import { StoreContext } from "../Context/context";
import ProductCard from "./ProductCard";
import NavigationBar from "./NavigationBar";
import "../Styles/CartPage.css";
import { IsMobileScreen } from './HomePage';

const CartPage = () => {
    const MobileScreen = IsMobileScreen();
    const { Cart } = useContext(StoreContext);

    return (
        <>
            <NavigationBar />
            <BuyTab items={Cart.length} totalAmount={Math.round(Cart.reduce((a, b) => b.ProductDiscounted ? a + b.ProductPrice / 2 : a + b.ProductPrice, 0))} />
            <div className="CartPage">
                {Cart && Cart.length > 0 ? (
                    Cart.map((cartItem) => (
                        <ProductCard
                            key={cartItem.ProductId} // Assuming ProductId is unique
                            ProductImage={cartItem.ProductImage}
                            ProductTitle={cartItem.ProductTitle}
                            ProductPrice={cartItem.ProductPrice}
                            ProductDescription={cartItem.ProductDescription}
                            ProductRating={cartItem.ProductRating}
                            AddedToCart={true}
                            Discounted={cartItem.ProductDiscounted}
                        />
                    ))
                ) : (
                    <div className="EmptyCartMessage">
                        <h3>Cart is empty</h3>
                    </div>
                )}
            </div>
        </>
    );
};

const BuyTab = ({ items, totalAmount }) => {
    const { Cart, setCart } = useContext(StoreContext);

    const handleBuyClick = () => {
        if (Cart.length === 0) {
            setCart([]);
            alert("Cart is empty!");
        } else {
            alert("Items ordered.\nThank You!");
        }
    };

    const handleRemoveAllClick = () => {
        setCart([]);
    };

    return (
        <div className="CartOptionsArea">
            <div className="BuyTabOptionsTab">
                <h3>Total Items:</h3>
                <p>{items}</p>
            </div>
            <div className="BuyTabOptionsTab">
                <h3>Total Amount:</h3>
                <p>Rs {totalAmount}/-</p>
            </div>
            <div className="BuyTabOptionsTab">
                <button className="BuyTabBtn" onClick={handleBuyClick}>Buy</button>
                <button className="BuyTabBtn" onClick={handleRemoveAllClick}>Remove All</button>
            </div>
        </div>
    );
};

export default CartPage;
