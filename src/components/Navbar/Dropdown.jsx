import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Button, rem } from '@mantine/core';
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
    // <div className={styles.dropdown}>
    //   {isOpen && (
    //     <ul className={styles.dropdownContent}>
    //       {items.map((item, index) => (
    //         <li className={styles.dropdownContentList} key={index}>
    //           {item === 'Logout' ? (
    //             <button className={styles.dropdownContentLink} onClick={handleLogout}>
    //               {item}
    //             </button>
    //           ) : (
    //             <Link className={styles.dropdownContentLink} to={`/${item}`}>
    //               {item}
    //             </Link>
    //           )}
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
    <Menu width={200} shadow="md">
      <Menu.Target>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff" className={styles.iconProfile} viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
        </svg>
      </Menu.Target>

      <Menu.Dropdown>
        {items.map((item, index) => (
          item === 'Logout' ? (
            <Menu.Item key={index} color="red" onClick={handleLogout}>
              {item}
            </Menu.Item>
          ) : (
            <Menu.Item key={index} component={Link} to={`/${item}`}>
              {item}
            </Menu.Item>
          )
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default Dropdown;
