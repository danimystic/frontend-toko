// Footer.jsx
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["top"]}>
        <div className={styles["top-left"]}>
          <div className={styles["become-a-member"]}>BECOME A MEMBER</div>
          <div className={styles["sign-up-for-email"]}>SIGN UP FOR EMAIL</div>
          <div className={styles["text-wrapper"]}>Send Us Feedback</div>
        </div>
        <div className={styles["top-right"]}>
          <img className={styles["img"]} alt="Frame" src="https://c.animaapp.com/Yz41YjBx/img/frame.svg" />
        </div>
      </div>
      <div className={styles["bottom"]}>
        <div className={styles["bottom-left"]}>
          <img className={styles["frame-4"]} alt="Frame" src="https://c.animaapp.com/Yz41YjBx/img/frame-1.svg" />
          <div className={styles["text-wrapper-2"]}>Surabaya, Indonesia</div>
        </div>
        <div className={styles["bottom-center"]}>
          <p className={styles["p"]}>© 2023 Dann, Inc. All Rights Reserved</p>
        </div>
        <div className={styles["bottom-right"]}>
          <div className={styles["text-wrapper-3"]}>Guides</div>
          <div className={styles["text-wrapper-4"]}>Terms of Sale</div>
          <div className={styles["text-wrapper-5"]}>Terms of Use</div>
          <div className={styles["text-wrapper-6"]}>Privacy Policy</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
