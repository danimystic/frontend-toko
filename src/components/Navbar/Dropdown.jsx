import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.css';

function Dropdown({ isOpen, items}) {
  return (
    <div className={styles.dropdown}>
      {isOpen && (
        <ul className={styles.dropdownContent}>
          {items.map((item, index) => (
            <li className={styles.dropdownContentList} key={index} >
                {item === 'Logout' ? 
                    (
                        <Link className={styles.dropdownContentLink} to={process.env.REACT_APP_BACKEND_URL+'/'+item}>{item}</Link>
                    ) :
                    (<Link className={styles.dropdownContentLink} to={'/'+item}>{item}</Link>)
                }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
