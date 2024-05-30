import React from "react";
import Navbar from "../Navbar/Navbar";
import { Carousel as MantineCarousel, Carousel } from '@mantine/carousel';
import styles from "./Home.module.css";
import { useMediaQuery } from '@mantine/hooks';
import CarouselHero from "./Carousel";
import { Link } from "react-router-dom";

const Home = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const categories = [
    { id: 1, img: "https://c.animaapp.com/Yz41YjBx/img/image-3@2x.png", title: "Varsity" },
    { id: 2, img: "/images/Hoodie.jpeg", title: "Hoodie" },
    { id: 3, img: "https://c.animaapp.com/Yz41YjBx/img/image-6@2x.png", title: "Sweater" },
    { id: 4, img: "https://c.animaapp.com/Yz41YjBx/img/image-4@2x.png", title: "Coach" },
    { id: 4, img: "https://c.animaapp.com/Yz41YjBx/img/image-5@2x.png", title: "Canvas" },

  ];

  return (
    <div className={styles.landingPage}>
      <Navbar />
      <div className={styles.body}>
        <CarouselHero />
        <div className={styles.categories}>
          <div className={styles.title}>
            <div className={styles.titleText}>Categories</div>
          </div>
          {isMobile ? (
            <MantineCarousel withIndicators height={410} loop>
              {categories.map((category) => (
                <MantineCarousel.Slide key={category.id}>
                  <Link>
                    <div className={styles.item}>
                      <img className={styles.image} alt={category.title} src={category.img} />
                      <div className={styles.card}>
                        <h3>{category.title}</h3>
                      </div>
                    </div>
                  </Link>
                </MantineCarousel.Slide>
              ))}
            </MantineCarousel>
          ) : (
            <div className={styles.items}>
              <Carousel
                withIndicators
                height={500}
                slideSize={{ base: '100%', sm: '50%', md: '25%' }}
                slideGap={{ base: 0, sm: 'xl' }}
                loop
                align="start"
              >
                {categories.map((category) => (
                  <Carousel.Slide>
                    <Link>
                      <div className={styles.item} key={category.id}>
                        <img className={styles.image} alt={category.title} src={category.img} />
                        <div className={styles.card}>
                          <h3>{category.title}</h3>
                        </div>
                      </div>
                    </Link>
                  </Carousel.Slide>
                ))}
                {/* ...other slides */}
              </Carousel>
            </div>

          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
