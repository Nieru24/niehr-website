import React from 'react'
import Header from '../components/header/Header'
import classes from '../pages-css/Home.module.css'
import WebsiteBackground from '../components/WebsiteBackground'
import Footer from '../components/Footer'
import Card from '../components/card/Card'
import CardItems from '../components/card/CardItems'


function home() {
  return (
    <>
    <WebsiteBackground/>
    <Header/>
    <div className='main-content'>
      <div className={classes.home}>
        <h1>Home Page</h1>
        <div className={classes.cardSection}>
          <div className={classes.cardSectionTitle}>
            <h2>Projects</h2>
          </div>
          <div className={classes.cardHolder}>
            {CardItems.map((item, index) => {
              return (
                <Card key={index} linkTo={item.linkTo} name={item.name} picLocation={item.picLocation} description={item.description}/>
              )
            })}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default home