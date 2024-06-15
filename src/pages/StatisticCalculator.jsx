import React from 'react'
import { useEffect, useState } from 'react';
import classes from '../pages-css/StatisticCalculator.module.css'
import Header from '../components/header/Header'
import WebsiteBackground from '../components/WebsiteBackground'


function statisticCalculator() {

  const [myArray, setMyArray] = useState([]);
  const [previousArray, setPreviousArray] = useState([0]);
  const [inputValue, setInputValue] = useState('');

  const formatArray = (array) => {
    const sortedArray = [...array].sort((a, b) => a - b);
    return sortedArray;
  };

  // For testing in console
  useEffect(() => {
    console.log('myArray:', formatArray(myArray));
    const sortedArray = formatArray(myArray);
    console.log(sortedArray[0]);
  }, [myArray]);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the array?')) {
      setPreviousArray(myArray);
      setMyArray([]);
    }
  };

  const handleUndo = () => {
    if (previousArray.length > 0) {
      setMyArray(previousArray);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === '' || /^[0-9]+$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleEnter = () => {
    if (inputValue !== '') {
      const newValue = parseInt(inputValue, 10);
      setPreviousArray(myArray);
      setMyArray([...myArray, newValue]);
      setInputValue('');
    }
  };

  const handleSampleData = () => {
    const sampleData = [31, 57, 54, 66, 40, 68, 42, 27, 70, 49, 67, 47, 36, 58, 50, 63, 55, 44, 71, 33, 38, 45, 57, 65, 58, 68, 51, 56, 53, 39, 45, 59, 66, 24, 64, 35, 47, 54, 60, 40, 52, 56, 67, 50, 46];
    setPreviousArray(myArray);
    setMyArray(sampleData);
  };

  return (
    <>
      <WebsiteBackground/>
      <Header/>
      <div className='main-content'>
        <div className={classes.calculator}>
          
          <div className={classes.data}>

            <h1 className={classes.name}>Data</h1>

            <div className={classes.divContainer}>
              <div className={classes.div1}>
                <input 
                  type="number" 
                  value={inputValue} 
                  onChange={handleInputChange} 
                  min="0" 
                  placeholder="Enter a number" 
                />
                <button onClick={handleEnter}>Enter</button>
                <button onClick={handleSampleData}>Sample Data</button>
              </div>

              <div className={classes.div2}>
                <div className={classes.labelsContainer}>
                  <div className="label">{formatArray(myArray).join(', ')}</div>
                </div>
              </div>

              <div className={classes.div3}>
                  <button onClick={handleClear}>Clear!</button>
                  <button onClick={handleUndo}>Undo</button>
              </div>
            </div>

          </div>

          <div className={classes.ungroupedCalculation}>
            
            <h1 className={classes.name}>Ungrouped Data Calculation</h1>
            
            <div className={classes.labelsContainer}>
              <div className={classes.label}>Range:</div>
              <div className={classes.label}>Mean:</div>
              <div className={classes.label}>Median:</div>
              <div className={classes.label}>Mode:</div>
              <div className={classes.label}>Sample Size (n):</div>
            </div>
          </div>

        </div> 
      </div>
      
    </>
  )
}

export default statisticCalculator