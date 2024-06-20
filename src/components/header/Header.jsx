import React from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.divcontainer}>
          <Link to='/home' className={classes.logocontainer}>
            <div className={classes.logo}></div>
            <h1><div className={classes.a}>Home</div></h1>
          </Link>
          <div className={classes.button}>
            <li className={classes.active}><Link className={classes.a} to='/statistic-calculator'>Statistic Calculator</Link></li>
            <li className={classes.active}><Link className={classes.a} to='/about'>About</Link></li>
            <li className={classes.active}><Link className={classes.a} to='/NoPage'>Help</Link></li>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
