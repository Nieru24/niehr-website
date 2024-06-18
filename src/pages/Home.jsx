import React from 'react'
import Header from '../components/header/Header'
import classes from '../pages-css/Home.module.css'
import WebsiteBackground from '../components/WebsiteBackground'
import Footer from '../components/Footer'


function home() {
  return (
    <>
    <WebsiteBackground/>
    <Header/>
    <div className={classes.home}>
      <h1>Home Page....Ako pa rin ang pinakamabait</h1>
    </div>
    <Footer/>
    </>
  )
}

export default home