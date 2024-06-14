import React from 'react';
import classes from './Header.module.css';
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.logo}>Logo</li>
          <div className={classes.button}>
            <li className={classes.active}><Link className={classes.a} to='/niehr-website/home'>Home</Link></li>
            <li className={classes.active}><Link className={classes.a} to='/niehr-website/statistic-calculator'>Statistic Calculator</Link></li>
            <li className={classes.active}><Link className={classes.a} to='/niehr-website/about'>About</Link></li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
