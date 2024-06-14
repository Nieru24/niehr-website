import React from 'react';
import classes from './Header.module.css';

function Header() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.logo}>Logo</li>
          <div className={classes.button}>
            <li className={classes.active}><a href="/niehr-website/home">Home</a></li>
            <li className={classes.active}><a href="/niehr-website/statistic-calculator">Statistic Calculator</a></li>
            <li className={classes.active}><a href="/niehr-website/about">About</a></li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
