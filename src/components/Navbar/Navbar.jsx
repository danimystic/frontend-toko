import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import Dropdown from "./Dropdown";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const location = useLocation();

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchSessionInfo = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/session-info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.status === 200) {
          const data = await response.json();
          setIsLoggedIn(true);
          setRole(data.role);
        } else {
          setIsLoggedIn(false);
          setRole('guest');
        }
      } catch (error) {
        console.error('Failed to fetch session info:', error);
      }
    };
    fetchSessionInfo();
  }, []);

  useEffect(() => {
    // Parsing query string to get gender
    const queryParams = new URLSearchParams(location.search);
    const gender = queryParams.get('gender');
    if (gender === "Men" || gender === "Women") {
      setSelectedGender(gender);
    }
  }, [location.search]);

  return (
    <header className={styles["header"]}>
      <div className={styles["kiri"]}>
        <Link to="/home" className={styles["text-wrapper-12"]}>Dann's Jacket World</Link>
      </div>
      <div className={styles["tengah"]}>
      <Link
          to="/products?gender=Men&category=All"
          className={`${styles["text-wrapper-10"]} ${selectedGender === "Men" ? styles.active : ""}`}
          style={{ color: selectedGender === "Men" ? "#f22e52" : "" }}
        >
          Men
        </Link>
        <Link
          to="/products?gender=Women&category=All"
          className={`${styles["text-wrapper-11"]} ${selectedGender === "Women" ? styles.active : ""}`}
          style={{ color: selectedGender === "Women" ? "#f22e52" : "" }}
        >
          Women
        </Link>
      </div>
      <div className={styles["kanan"]}>
        <Link to="/products">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" className={styles.iconSearch} viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </Link>

        {isLoggedIn && role !== 'admin' && (
          <Link to="/carts">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff" className={styles.iconChart} viewBox="0 0 16 16">
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
          </Link>
        )}

        <div className={styles["profile-icon"]} onClick={toggleOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff" className={styles.iconProfile} viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
          </svg>
          {isLoggedIn ?
            (
              role === 'admin' ? (
                <Dropdown items={['Add-Products', 'Orders', 'Logout']} isOpen={isOpen} />
              ) :
                (
                  <Dropdown items={['Orders', 'Logout']} isOpen={isOpen} />
                )
            ) :
            (
              <Dropdown items={['Login', 'SignUp']} isOpen={isOpen} />
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Navbar;
