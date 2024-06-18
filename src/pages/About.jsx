import React from 'react'
import Header from '../components/header/Header'
import classes from '../pages-css/About.module.css'
import WebsiteBackground from '../components/WebsiteBackground'
import Footer from '../components/Footer'

function about() {
  return (
    <>
    <Header/>
    <div className={classes.about}>
      <h1>About Page</h1>
    </div>
    <WebsiteBackground/>
    <Footer/>
    </>
  )
}

export default about