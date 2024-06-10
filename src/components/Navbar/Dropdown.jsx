import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Dropdown.module.css';

function Dropdown({ isOpen, items }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
        method: 'GET',
        credentials: 'include' // Mengirim cookie dengan permintaan
      });

      if (response.ok) {
        // Redirect to login page or home page after logout
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={styles.dropdown}>
      {isOpen && (
        <ul className={styles.dropdownContent}>
          {items.map((item, index) => (
            <li className={styles.dropdownContentList} key={index}>
              {item === 'Logout' ? (
                <button className={styles.dropdownContentLink} onClick={handleLogout}>
                  {item}
                </button>
              ) : (
                <Link className={styles.dropdownContentLink} to={`/${item}`}>
                  {item}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
