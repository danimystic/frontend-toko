import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Carousel from "./Carousel";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.landingPage}>
      <Navbar />
      <div className={styles.body}>
        <Carousel />
        <div className={styles.categories}>
          <div className={styles.title}>
            <div className={styles.titleText}>Categories</div>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <img className={styles.image} alt="varsity" src="https://c.animaapp.com/Yz41YjBx/img/image-3@2x.png" />
              <div className={styles.card}>
                <h3>jaket</h3>
                <p>10% Off</p>
              </div>
            </div>
            <div className={styles.item}>
              <img className={styles.image} alt="coach" src="https://c.animaapp.com/Yz41YjBx/img/image-4@2x.png" />
              <div className={styles.card}>
                <h3>kemeja</h3>
                <p>10% Off</p>
              </div>
            </div>
            <div className={styles.item}>
              <img className={styles.image} alt="canvas" src="https://c.animaapp.com/Yz41YjBx/img/image-5@2x.png" />
              <div className={styles.card}>
                <h3>kemeja</h3>
                <p>10% Off</p>
              </div>
            </div>
            <div className={styles.item}>
              <img className={styles.image} alt="sweater" src="https://c.animaapp.com/Yz41YjBx/img/image-6@2x.png" />
              <div className={styles.card}>
                <h3>Hoodie</h3>
                <p>10% Off</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
