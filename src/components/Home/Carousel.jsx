// Carousel.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Carousel as MantineCarousel } from '@mantine/carousel';
import styles from "./Carousel.module.css";

const Carousel = () => {
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

      <MantineCarousel.Slide>
        <Link to="" className={styles.slide}>
          <div className={styles.imageWrapper}>
            <img
              src="https://c.animaapp.com/Yz41YjBx/img/image-2.png"
              alt="Slide 2"
              className={styles.image}
            />
          </div>
          <div className={styles.caption}>
            <h2>Erika coach Jacket <br /> Wander Lust black</h2>
          </div>
        </Link>
      </MantineCarousel.Slide>

      <MantineCarousel.Slide>
        <Link to="" className={styles.slide}>
          <div className={styles.imageWrapper}>
            <img
              src="https://c.animaapp.com/Yz41YjBx/img/image-2.png"
              alt="Slide 3"
              className={styles.image}
            />
          </div>
          <div className={styles.caption}>
            <h2>Erifa coach Jacket <br /> Wander Lust brown</h2>
          </div>
        </Link>
      </MantineCarousel.Slide>
    </MantineCarousel>
  );
};

export default Carousel;
