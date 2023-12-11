import React from "react";
import styles from "./Home.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Carousel from "./Carousel";

export const Home = () => {
    return (
    <div className={styles["landing-page"]}>
            <Navbar />
            <div className={styles["body"]}>
                <Carousel />
                <div className={styles["categories"]}>
                    <div className={styles["tulisan-2"]}>
                        <div className={styles["text-wrapper-8"]}>Categories</div>
                    </div>
                    <div className={styles["isi"]}>
                        <div className={styles["varsity"]}>
                            <img className={styles["gambar"]} alt="varsity" src="https://c.animaapp.com/Yz41YjBx/img/image-3@2x.png" />
                            <div className={styles["auto-layout-vertical-wrapper"]}>
                                <div className={styles["auto-layout-vertical-3"]}>
                                    <div className={styles["text-wrapper-7"]}>Varsity</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles["coach"]}>
                            <img className={styles["gambar"]} alt="coach" src="https://c.animaapp.com/Yz41YjBx/img/image-4@2x.png" />
                            <div className={styles["auto-layout-vertical-wrapper"]}>
                                <div className={styles["auto-layout-vertical-2"]}>
                                    <div className={styles["text-wrapper-7"]}>Coach</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles["canvas"]}>
                            <img className={styles["gambar"]} alt="canvas" src="https://c.animaapp.com/Yz41YjBx/img/image-5@2x.png" />
                            <div className={styles["auto-layout-vertical-wrapper"]}>
                                <div className={styles["canvas-wrapper"]}>
                                    <div className={styles["text-wrapper-7"]}>Canvas</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles["sweater"]}>
                            <img className={styles["gambar"]} alt="sweater" src="https://c.animaapp.com/Yz41YjBx/img/image-6@2x.png" />
                            <div className={styles["tulisan"]}>
                                <div className={styles["auto-layout-vertical"]}>
                                    <div className={styles["text-wrapper-7"]}>Sweater</div>
                                </div>
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
