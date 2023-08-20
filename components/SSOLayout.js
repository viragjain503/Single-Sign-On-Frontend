// components/Layout.js
import React from 'react';
import styles from '../styles/SSOLayout.module.css'; // Import your CSS module

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <header>
      </header>
      <main id='mymain'>{children}</main>
      <footer>
      </footer>
    </div>
  );
};

export default Layout;
