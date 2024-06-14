import React from 'react'

function noPage() {
  const styles ={
    display: "Grid",
    placeItems: "center",
    height: "70vh",
  }

  return(
  <>
  <h1 className="errorMessage" style={styles}>Error 404: Page not found.</h1>          
  </>
    );
}

export default noPage