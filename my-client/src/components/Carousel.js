import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../assets/carousel/1.jpg';
import img2 from '../assets/carousel/2.jpg';
import img3 from '../assets/carousel/3.jpg';
import img4 from '../assets/carousel/4.jpg';
import img5 from '../assets/carousel/5.jpg';
import styles from './Carousel.module.css'; // 引入您的CSS模块

const Carousel = () => {

    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={`${className} ${styles.arrow} ${styles.next}`}
                onClick={onClick}
            >
                →
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={`${className} ${styles.arrow} ${styles.prev}`}
                onClick={onClick}
            >
                ←
            </div>
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className={styles.carouselContainer}>
            <Slider {...settings}>
                <div>
                    <img src={img1} className={styles.carouselImage} alt="p 1" />
                </div>
                <div>
                    <img src={img2} className={styles.carouselImage} alt="p 2" />
                </div>
                <div>
                    <img src={img3} className={styles.carouselImage} alt="p 3" />
                </div>
                <div>
                    <img src={img4} className={styles.carouselImage} alt="p 4" />
                </div>
                <div>
                    <img src={img5} className={styles.carouselImage} alt="p 5" />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;
