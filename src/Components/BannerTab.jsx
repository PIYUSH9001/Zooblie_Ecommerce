import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import "../Styles/HomePage.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner1 from "../Banners/BannerImage1.jpg"
import Banner2 from "../Banners/BannerImage2.jpg"
import { useNavigate } from "react-router";

const BannerTab = () => {
    const navigate = useNavigate();
    const settings = {
        dots:false,
        infinite:true,
        speed:1000,
        autoplay:true,
        autoplaySpeed:3000,
        slidesToShow:1,
        slidesToScroll:1,
        arrows:false,
        fade:true,
        lazyLoad:true,
        pauseOnHover:false,
        swipe:true,
    }
    return (
        <Slider {...settings}>
            <div><a href={encodeURI("/products/category/jewelery")} onClick={(event)=>{
                event.preventDefault();
                navigate(encodeURI("/products/category/jewelery"));
            }}>
            <img src={Banner1} alt="" className="Banner"/>
            </a>
            </div>
            <div>
                <a href={encodeURI("/products/category/men's clothing")} onClick={(event)=>{
                    event.preventDefault();
                    navigate(encodeURI("/products/category/men's clothing"));
                }}>
            <img src={Banner2} alt="" className="Banner"/>
                </a>
            </div>
        </Slider>
    )
}

export default BannerTab;
