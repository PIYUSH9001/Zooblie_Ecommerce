import React from "react";
import Slider from 'react-slick';
import "../Styles/HomePage.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner1 from "../Banners/BannerImage1.jpg";
import Banner2 from "../Banners/BannerImage2.jpg";
import { useNavigate } from "react-router";

const BannerTab = () => {
    const navigate = useNavigate();

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        lazyLoad: true,
        pauseOnHover: false,
        swipe: true,
    };

    const handleNavigation = (event, path) => {
        event.preventDefault();
        navigate(encodeURI(path));
    };

    return (
        <Slider {...settings}>
            <div>
                <a href="/products/category/jewelery" onClick={(event) => handleNavigation(event, "/products/category/jewelery")}>
                    <img src={Banner1} alt="Jewelery Banner" className="Banner" />
                </a>
            </div>
            <div>
                <a href="/products/category/men's clothing" onClick={(event) => handleNavigation(event, "/products/category/men's clothing")}>
                    <img src={Banner2} alt="Men's Clothing Banner" className="Banner" />
                </a>
            </div>
        </Slider>
    );
};

export default BannerTab;

