import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.scss';
import Paths from '../paths';

export default () => (
  <nav>
    <ul className={styles.menu}>
      <li>
        <Link to={Paths.Home}>Home</Link>
      </li>
      <li>
        <Link to={Paths.Counter}>Counter</Link>
      </li>
      <li>
        <Link to={Paths.TestIntegration}>TestIntegration</Link>
      </li>
    </ul>
  </nav>
);
