// Carousel.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Carousel as MantineCarousel } from '@mantine/carousel';
import styles from "./Carousel.module.css";

const CarouselHero = () => {
  return (
    <MantineCarousel withIndicators height={760} className={styles.carousel} loop>
      <MantineCarousel.Slide>
        <Link to="" className={styles.slide}>
          <div className={styles.imageWrapper}>
            <img
              src="https://c.animaapp.com/Yz41YjBx/img/image-2.png"
              alt="Slide 1"
              className={styles.image}
            />
          </div>
          <div className={styles.caption}>
            <h2>Erigo coach Jacket <br /> Wander Lust navy</h2>
          </div>
        </Link>
      </MantineCarousel.Slide>

      {/*  */}
      <MantineCarousel.Slide>
        <Link to="" className={styles.slide}>
          <div className={styles.imageWrapper}>
            <img
              src="/images/model2.jpeg"
              alt="Slide 2"
              className={styles.image}
            />
          </div>
          <div className={styles.caption}>
            <h2>Gucci Cotton Canvas & <br /> GG Supreme Jacket <br /> Dark Grey</h2>
          </div>
        </Link>
      </MantineCarousel.Slide>

      {/* hodiee */}
      <MantineCarousel.Slide>
        <Link to="" className={styles.slide}>
          <div className={styles.imageWrapper}>
            <img
              src="/images/model3.jpg"
              alt="Slide 3"
              className={styles.image}
            />
          </div>
          <div className={styles.caption}>
            <h2>Comfy Cotton Hoodie <br /> Midnight White</h2>
          </div>
        </Link>
      </MantineCarousel.Slide>
    </MantineCarousel>
  );
};

export default CarouselHero;
