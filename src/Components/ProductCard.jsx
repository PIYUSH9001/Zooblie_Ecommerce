import React, { useContext, useState } from "react";
import "../Styles/Product.css";
import { StoreContext } from "../Context/context";
import ReactRatingStars from 'react-rating-stars-component';

const ProductCard = (props) => {
    const { Cart, setCart, isInCart } = useContext(StoreContext);
    const { ProductImage, ProductTitle, ProductPrice, Discounted ,ProductDescription,ProductRating} = props;
    const [IsSelected, setIsSelected] = useState(false);
    const AvgRating = props.ProductRating;
    const CloseBtn = () => {
        return (
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
    };
    const handleMouseOver = (event, isCartBtn) => {
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
                    height: IsSelected ? '90vh' : '25em',
                    width: IsSelected ? '80vw' : '20em',
                    position: IsSelected ? 'fixed' : 'static',
                    top: IsSelected ? '45%' : 'auto',
                    left: IsSelected ? '50%' : 'auto',
                    transform: IsSelected ? 'translate(-50%, -50%)' : 'none',
                    alignSelf: 'center',
                    justifySelf: 'center',
                    zIndex: IsSelected ? 1000 : 'auto',
                }}
            >
                {IsSelected && <CloseBtn />}
                <img src={ProductImage} alt={ProductTitle} />
                <h3>{ProductTitle}</h3>
                {IsSelected && (
                    <p style={
                        {
                            fontWeight:'lighter',
                            fontSize:'1.15em',
                            height:'2.5em',
                            width:'auto',
                            // margin:'0.1em',
                            color:'red',
                        }
                    }>{props.ProductDescription}</p>
                )}
                {Discounted ? (
                    <>
                        <s style={{ textDecorationThickness: '0.125em'}}>Rs {ProductPrice}/-</s>
                        <p style={{ color: 'red',}}>Rs {ProductPrice * 0.5}/-</p>
                    </>
                ) : (
                    <p>Rs {ProductPrice}/-</p>
                )}
                {IsSelected && (
                    <div className="RatingTab">
                        <p style={
                            {
                             fontWeight:'lighter',
                             position:'relative',
                            top:'5%',
                                padding:'0.125em',
                                margin:'0.125em'
                            }
                        }>({AvgRating})
                        </p>
                        <RatingComponent rating={AvgRating}/>

                    </div>
                )}
                <div className="ButtonsTab">
                    <button
                        className="ProductBtn"
                        onMouseOver={(event) => handleMouseOver(event, addedToCart)}
                        onMouseOut={(event) => handleMouseOut(event, addedToCart)}
                        style={{
                            border: addedToCart ? '2px solid red' : 'none',
                            backgroundColor: addedToCart ? 'white' : 'black',
                            color: addedToCart ? 'red' : 'white',
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

const RatingComponent = ({rating})=>{
    return(
        <ReactRatingStars
        count={5}
        value={rating}
        size={30}
        color="lightgray"
        activeColor="green" 
        edit={false}
        isHalf={true}
        />
    )
}

export default ProductCard;
