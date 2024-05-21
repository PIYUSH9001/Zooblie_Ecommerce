import React, { useContext, useEffect } from "react";
import { StoreContext } from "../Context/context";
import ProductCard from "./ProductCard";
import NavigationBar from "./NavigationBar";
import "../Styles/CartPage.css"

const CartPage = () => {
    const { Cart } = useContext(StoreContext);
    useEffect(()=>{
        console.log(Cart)
    },[Cart])
    return (
        <>
            <NavigationBar />
            <BuyTab Items={Cart.length} TotalAmount={Math.round(Cart.reduce((a,b)=>b.ProductDiscounted?a+b.ProductPrice/2:a+b.ProductPrice,0))}/>
            <div className="CartPage">
                {Cart && Cart.length > 0 ? (
                    Cart.map((cartItem) => (
                        <ProductCard
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
                    <div>
                        <h3 style={
                            {
                                fontWeight: 'bold',
                                fontSize: '1.5em',
                            }
                        }>Cart is empty</h3>
                    </div>
                )}
            </div>
        </>
    );
};

const BuyTab = (props) => {
    const {Cart,setCart} = useContext(StoreContext);
    return (
        <div style={{
            height: 'auto',
            width: '95vw',
            display: 'flex',
            backgroundColor: 'lightgray',
            // border: '1px solid black',
            position: 'fixed',
            padding: '1em',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '1%',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderRadius: '1em'
        }}>
            <div className="BuyTabOptionsTab">
                <h3>Total Items:</h3>
                <p>{props.Items}</p>
            </div>
            <div className="BuyTabOptionsTab">
                <h3>Total Amount:</h3>
                <p>Rs {props.TotalAmount}/-</p>
            </div>
            <div className="BuyTabOptionsTab">
                <button className="BuyTabBtn" onClick={()=>{
                    if(Cart.length === 0){
                        setCart([]);
                        alert("Cart is empty!");
                    }
                    else{
                        alert("Items ordered.\nThank You!");
                    }
                }}>Buy</button>
                <button className="BuyTabBtn" onClick={()=>{
                    setCart([]);
                }}>Remove All</button>
            </div>
        </div>
    )
}

export default CartPage;
