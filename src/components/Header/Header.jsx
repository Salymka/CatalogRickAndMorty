import React from 'react';
import logo from '../../ctatic/logo.png'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <div className={styles.header}>
            <img src={logo} className={styles.header__logo} alt={"Rick&Morty"}/>
        </div>
    );
};

export default Header;