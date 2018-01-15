import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.scss';
import Paths from '../paths';

const Menu = () => (
  <nav>
    <ul className={styles.menu}>
      <li>
        <Link to={Paths.Home}>Home</Link>
      </li>
      <li>
        <Link to={Paths.ProjectList}>Projects</Link>
      </li>
      <li>
        <Link to={Paths.Logout}>Logout</Link>
      </li>
    </ul>
  </nav>
);

export default Menu;
