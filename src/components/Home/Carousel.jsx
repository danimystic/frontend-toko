// Carousel.jsx
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styles from "./Carousel.module.css";


const Carousel = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...sliderSettings} className={styles.carousel}>
      <Link to="" className={styles.slide}>
        <img
          src="https://c.animaapp.com/Yz41YjBx/img/image-2.png" // Ganti URL gambar sesuai kebutuhan
          alt="Slide 1"
          className={styles.image}
        />
        <div className={styles.caption}>
          <h2>Erigo coach Jacket <br/> Wander Lust navy</h2>
        </div>
      </Link>

      <Link to="" className={styles.slide}>
        <img
          src="https://c.animaapp.com/Yz41YjBx/img/image-2.png" // Ganti URL gambar sesuai kebutuhan
          alt="Slide 2"
          className={styles.image}
        />
        <div className={styles.caption}>
          <h2>Erika coach Jacket <br/> Wander Lust black</h2>
        </div>
      </Link>

      <Link to="" className={styles.slide}>
        <img
          src="https://c.animaapp.com/Yz41YjBx/img/image-2.png" // Ganti URL gambar sesuai kebutuhan
          alt="Slide 3"
          className={styles.image}
        />
        <div className={styles.caption}>
          <h2>Erifa coach Jacket <br/> Wander Lust brown</h2>
        </div>
      </Link>
    </Slider>
  );
};

export default Carousel;
