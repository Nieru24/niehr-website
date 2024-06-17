import React from 'react'
import { useEffect, useState } from 'react';
import classes from '../pages-css/StatisticCalculator.module.css'
import Header from '../components/header/Header'
import WebsiteBackground from '../components/WebsiteBackground'


function StatisticCalculator() {

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


  const range = (array) => {
    const sortedArray = formatArray(array);
    return sortedArray[sortedArray.length - 1] - sortedArray[0];
  };

  const mean = (array) => {
    const total = array.reduce((acc, curr) => acc + curr, 0);
    return (total / array.length).toFixed(2);
  };

  const median = (array) => {
    const sortedArray = formatArray(array);
    const mid = Math.floor(sortedArray.length / 2);
    return sortedArray.length % 2 !== 0 ? sortedArray[mid] : ((sortedArray[mid - 1] + sortedArray[mid]) / 2).toFixed(2);
  };

  const mode = (array) => {
    const frequency = {};
    let maxFreq = 0;
    let modes = [];

    array.forEach(value => {
      frequency[value] = (frequency[value] || 0) + 1;
      if (frequency[value] > maxFreq) {
        maxFreq = frequency[value];
        modes = [value];
      } else if (frequency[value] === maxFreq) {
        modes.push(value);
      }
    });

    return modes.length === array.length ? 'No mode' : modes.join(', ');
  };

  const sampleSize = (array) => array.length;

  return (
    <>
      <WebsiteBackground/>
      <Header/>
      <div className='main-content'>
        <div className={classes.calculator}>
          
          <div className={classes.data}>

            <h1 className={classes.name}>Data Set</h1>

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

          <div className={classes.row2}>

            <div className={classes.ungroupedCalculation}>
              
              <h1 className={classes.name}>Ungrouped Data Calculation</h1>
              
              <div className={classes.labelsContainer}>
                <div className={classes.label}>Range: {range(myArray)}</div>
                <div className={classes.label}>Mean: {mean(myArray)}</div>
                <div className={classes.label}>Median: {median(myArray)}</div>
                <div className={classes.label}>Mode: {mode(myArray)}</div>
                <div className={classes.label}>Sample Size (n): {sampleSize(myArray)}</div>
              </div>
            </div>

            <div className={classes.settings}>
              <h1 className={classes.name}>Settings (In work)</h1>
              <div className={classes.labelsContainer}>

                <label className={classes.settingRbtn}>
                  <div>
                    <input type="radio" name="setting" id="setting-1" />
                    <span className={classes.settingLabel}>Number of Classes</span>
                  </div>
                  <input 
                    type="number" 
                    onChange="" 
                    min="1" 
                    placeholder="Enter a number" 
                  />
                </label>

                <label className={classes.settingRbtn}>
                  <div>
                    <input type="radio" name="setting" id="setting-2" />
                    <span className={classes.settingLabel}>Class Interval</span>
                  </div>
                  <input 
                    type="number" 
                    onChange="" 
                    min="1" 
                    placeholder="Enter a number" 
                  />
                </label>

              </div>
            </div>

            <div className={classes.groupedCalculation}>
              <h1 className={classes.name}>Grouped Data Calculation (In work)</h1>
              <div className={classes.labelsContainer}>
                <div className={classes.label}>Mean: {range(myArray)}</div>
                <div className={classes.label}>Median: {range(myArray)}</div>
                <div className={classes.label}>Mode: {range(myArray)}</div>
              </div>
            </div>

            <div className={classes.percentiles}>
              <h1>Percentiles (In work)</h1>
              
              <div className={classes.labelsContainer}>
                <div className={classes.input}>i = 
                  <input 
                    type="number" 
                    onChange="" 
                    min="1" 
                    max="100"
                    placeholder="Enter a number" 
                  />
                </div>
                <div className={classes.label}>Percentiles = {range(myArray)}</div>
              </div>
            </div>

          </div>

          <div className={classes.tableContainer}>
            <div className={classes.table}>Class Interval</div>
            <div className={classes.table}>Class Boundaries</div>
            <div className={classes.table}>Class Marks</div>
            <div className={classes.table}>Frequency</div>
            <div className={classes.table}>Cumulative Frequency</div>
            <div className={classes.table}>Cumulative Percent Frequency</div>
            <div className={classes.table}>Relative Frequency</div>
          </div>

        </div> 
      </div>
      
    </>
  )
}

export default StatisticCalculator