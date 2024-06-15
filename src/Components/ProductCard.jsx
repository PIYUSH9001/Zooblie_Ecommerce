import React, { useContext, useState } from "react";
import "../Styles/Product.css";
import { StoreContext } from "../Context/context";
import ReactRatingStars from 'react-rating-stars-component';
import { IsMobileScreen } from './HomePage';

const ProductCard = ({ ProductImage, ProductTitle, ProductPrice, Discounted, ProductDescription, ProductRating }) => {
    const MobileScreen = IsMobileScreen();
    const { Cart, setCart, isInCart } = useContext(StoreContext);
    const [IsSelected, setIsSelected] = useState(false);
    const RatingComponent = () => (
        <ReactRatingStars
            count={5}
            value={ProductRating}
            size={IsMobileScreen?17.5:30}
            color="lightgray"
            activeColor="red"
            edit={false}
            isHalf={true}
        />
    );
    const CloseBtn = () => (
        <button
            onClick={(event) => {
                event.stopPropagation();
                setIsSelected(false);
            }}
            className="close-btn"
            id="CloseBtn"
        >
            X
        </button>
    );

    const handleMouseOver = (event) => {
        event.target.style.backgroundColor = "red";
        event.target.style.color = "white";
    };

    const handleMouseOut = (event, isCartBtn) => {
        event.target.style.backgroundColor = isCartBtn ? "white" : "black";
        event.target.style.color = isCartBtn ? "red" : "white";
    };

    const addToCart = () => {
        const newCartItem = {
            ProductImage,
            ProductTitle,
            ProductPrice,
            ProductDiscounted: Discounted,
            ProductDescription,
            ProductRating,
        };
        setCart([...Cart, newCartItem]);
    };

    const removeFromCart = () => {
        const updatedCart = Cart.filter(product => product.ProductTitle !== ProductTitle);
        setCart(updatedCart);
    };

    const handleCartButtonClick = (event) => {
        event.stopPropagation();
        if (isInCart(ProductTitle)) {
            removeFromCart();
        } else {
            addToCart();
        }
    };

    const addedToCart = isInCart(ProductTitle);

    return (
        <>
            {IsSelected && <div className="overlay" onClick={() => setIsSelected(false)}></div>}
            <div
                className="ProductCard"
                onClick={(event) => {
                    if (event.target.id !== 'CloseBtn') {
                        setIsSelected(true);
                    }
                }}
                style={{
                    height: IsSelected ? '90vh' : MobileScreen ? '15em' : '25em',
                    width: IsSelected ? MobileScreen ? '95vw' : '80vw' : MobileScreen ? '10em' : '20em',
                    margin: MobileScreen ? 'none' : '1em',
                    position: IsSelected ? 'fixed' : 'static',
                    top: IsSelected ? '45%' : 'auto',
                    left: IsSelected ? '50%' : 'auto',
                    transform: IsSelected ? MobileScreen ? 'translate(-52%, -45%)' : 'translate(-50%, -50%)' : 'none',
                    alignSelf: 'center',
                    justifySelf: 'center',
                    zIndex: IsSelected ? 1000 : 'auto',
                }}
            >
                {IsSelected && <CloseBtn />}
                <img src={ProductImage} alt={ProductTitle} />
                <h3>{ProductTitle}</h3>
                {IsSelected && (
                    <p style={{
                        fontWeight: 'lighter',
                        fontSize: '1.15em',
                        height: '2.5em',
                        width: 'auto',
                        color: 'red',
                        overflowY: 'auto',
                        cursor: 'text',
                    }}>{ProductDescription}</p>
                )}
                {Discounted ? (
                    <>
                        <s style={
                            {
                                textDecorationThickness: '0.125em',
                                fontSize:'0.85em', 
                            }
                        }>Rs {Math.round(ProductPrice)
                            }/-</s>
                        <p style={
                            {
                                 color: 'red' ,
                                 fontSize:'1em',
                                }
                            }>Rs {Math.round(ProductPrice * 0.5)}/-</p>
                    </>
                ) : (
                    <p>Rs {Math.round(ProductPrice)}/-</p>
                )}
                {/* {IsSelected && ( */}
                    <div className="RatingTab">
                        <p style={{
                            fontWeight: 'lighter',
                            position: 'relative',
                            top: '5%',
                            padding: '0.125em',
                            margin: '0.125em'
                        }}>({ProductRating})
                        </p>
                        <RatingComponent/>
                    </div>
                {/* )} */}
                <div className="ButtonsTab">
                    <button
                        className="ProductBtn"
                        onMouseOver={(event) => handleMouseOver(event)}
                        onMouseOut={(event) => handleMouseOut(event, addedToCart)}
                        style={{
                            border: addedToCart && !MobileScreen ? '1px solid red' : 'none',
                            backgroundColor: addedToCart ? MobileScreen ? 'red' : 'white' : 'black',
                            color: addedToCart ? MobileScreen ? 'white' : 'red' : 'white',
                            width: MobileScreen ? '100%' : '50%',
                            fontSize: MobileScreen ? IsSelected ? '1.5em' : '0.75em' : '0.8em',
                            height: IsSelected && MobileScreen ? '50%' : '80%',
                        }}
                        onClick={handleCartButtonClick}
                    >
                        {addedToCart ? 'Remove from cart' : 'Add to cart'}
                    </button>
                </div>
            </div>
        </>
    );
};



export default ProductCard;

