import React, { useState } from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';


function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.divcontainer}>
          <Link to='/home' className={classes.logocontainer}>
            <div className={classes.logo}></div>
            <h1><div className={classes.a}>Home</div></h1>
          </Link>
          <div className={`${classes['menu-toggle']} ${showMenu ? classes.show : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`${classes.button} ${showMenu ? classes.show : ''}`}>
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
