import React from 'react'
import { useEffect, useState } from 'react';
import classes from '../pages-css/StatisticCalculator.module.css'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
import WebsiteBackground from '../components/WebsiteBackground'
import { range } from '@mantine/hooks';


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
    console.log(groupedCalcArray);
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


  const [isClassInterval, setIsClassInterval] = useState(false);
  const [isClassSize, setIsClassSize] = useState(false);

  //IDK
  const [classInterval, setClassInterval] = useState(0);
  const [classSize, setClassSize] = useState(0);

  //Eh?
  const [lowerCLArray, setLowerCLArray] = useState([]);
  const [upperCLArray, setUpperCLArray] = useState([]);


  const [groupedCalcArray, setGroupedCalcArray] = useState([
    [], [], [], [], [], [], [], [], [], [], []
    /*  1: Lower Class
        2: Upper Class
        3: Lower Boundary
        4: Upper Boundary
        5: Class Mark
        6: Frequency
        7: Greatest Cumulative Frequency
        8: Least Cumulative Frequency
        9: Greatest Cumulative Percent Frequency
        10: Least Cumulative Percent Frequency
        11:
    */
  ]);

  const handleClassIntervalChange = () => {
    setIsClassInterval(true);
    setIsClassSize(false);
    calcsClassInterval();
  };

  const handleClassSizeChange = () => {
    setIsClassInterval(false);
    setIsClassSize(true);
    calcsClassInterval();
  };

  const handleTextSetting = (e) => {
    if (isClassInterval) {
      setClassInterval(Number(e.target.value));
    } else if (isClassSize) {
      setClassSize(Number(e.target.value));
    }
    // We can make error alert
    calcsClassInterval();
  };

  const calcsClassInterval = () => {
    const rangeValue = range(myArray);

    let roundedResult;
    let finalClassInterval;

    if (isClassInterval) {
      if (!classInterval) {
        // Error: no input
        return;
      }

      finalClassInterval = classInterval;
      roundedResult = Math.round(rangeValue / finalClassInterval) - 1;
    } else if (isClassSize) {
      if (!classSize) {
        // Error: no input
        return;
      }

      roundedResult = classSize - 1;
      finalClassInterval = Math.round(rangeValue / (roundedResult + 1));
    } else {
      // Error: didnt choose setting
      return;
    }

    const lowerArray = new Array(finalClassInterval + 1).fill(0);
    const upperArray = new Array(finalClassInterval + 1).fill(0);

    lowerArray[0] = myArray[0];
    upperArray[0] = lowerArray[0] + roundedResult;

    setLowerCLArray(lowerArray);
    setUpperCLArray(upperArray);

    // Update groupedCalcArray with the calculated values
    const updatedGroupedCalcArray = lowerArray.map((_, index) => [
      lowerArray[index],     // Lower Class
      upperArray[index],     // Upper Class
      lowerArray[index] - 0.5,     // Lower Boundary (assuming boundaries are same as lower class)
      upperArray[index] + 0.5,     // Upper Boundary (assuming boundaries are same as upper class)
      (lowerArray[index] + upperArray[index]) / 2, // Class Mark
      0,                     // Frequency (initially set to 0)
      0,                     // Greatest Cumulative Frequency (initially set to 0)
      0,                     // Least Cumulative Frequency (initially set to 0)
      0,                     // Greatest Cumulative Percent Frequency (initially set to 0)
      0,                     // Least Cumulative Percent Frequency (initially set to 0)
      0                      // Placeholder for additional data
    ]);

    setGroupedCalcArray(updatedGroupedCalcArray);
  };
  
  // Last, Later
  const handlePercentiles = () => {

  };

  useEffect(() => {
    console.log('myArray:', formatArray(myArray));
    const sortedArray = formatArray(myArray);
    console.log(sortedArray[0]);
    console.log(groupedCalcArray);
  }, [myArray]);

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
                  <div className={classes.settingRbtn}>
                      <div>
                          <input type="radio" name="setting" id="setting-1" checked={isClassInterval} onChange={handleClassIntervalChange} />
                          <span className={classes.settingLabel}>Number of Classes</span>
                      </div>
                      <div>
                          <input type="radio" name="setting" id="setting-2" checked={isClassSize} onChange={handleClassSizeChange} />
                          <span className={classes.settingLabel}>Numeber of Class Size</span>
                      </div>
                  </div>
                  <input 
                      type="number" 
                      onChange={handleTextSetting} 
                      min="1" 
                      placeholder="Enter a number" 
                      disabled={!isClassInterval && !isClassSize}
                  />
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
                    onChange={handlePercentiles} 
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
            
            <div className={classes.table2}>
              <h1>Class Interval</h1>
              <div className={classes.displayContainer}>
                <div>
                  <h1>LC</h1>
                  <div className={classes.display}>
                    <div className="label">{lowerCLArray.join(' ')}</div>
                  </div>
                </div>
                <div>
                  <h1>UC</h1>
                  <div className={classes.display}>
                    <div className="label">{upperCLArray.join(' ')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.table2}>
              <h1>Class Boundaries</h1>
              <div className={classes.displayContainer}>
                <div>
                  <h1>LB</h1>
                  <div className={classes.display}>
                    <div className="label">{formatArray(myArray).join(' ')}</div>
                  </div>
                </div>
                <div>
                  <h1>UB</h1>
                  <div className={classes.display}>
                    <div className="label">{formatArray(myArray).join(' ')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.table}>
              <h1>Class Marks</h1>
              <div className={classes.displayContainer}>
                <div>
                  <h1>i</h1>
                  <div className={classes.display}>
                    <div className="label">{groupedCalcArray.map(item => item[4]).join(' ')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.table}>
              <h1>Frequency</h1>
              <div className={classes.displayContainer}>
                <div>
                  <h1>f</h1>
                  <div className={classes.display}>
                    <div className="label">{formatArray(myArray).join(' ')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.table2}>
              <h1>Cumulative Frequency</h1>
              <div className={classes.displayContainer}>
                <div>
                  <h1>&gt;cf</h1>
                  <div className={classes.display}>
                    <div className="label">{formatArray(myArray).join(' ')}</div>
                  </div>
                </div>
                <div>
                  <h1>&lt;cf</h1>
                  <div className={classes.display}>
                    <div className="label">{formatArray(myArray).join(' ')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.table2}>
              <h1>Cumulative Percent Frequency</h1>
              <div className={classes.displayContainer}>
                <div>
                  <h1>&gt;cpf</h1>
                  <div className={classes.display}>
                    <div className="label">{formatArray(myArray).join(' ')}</div>
                  </div>
                </div>
                <div>
                  <h1>&lt;cpf</h1>
                  <div className={classes.display}>
                    <div className="label">{formatArray(myArray).join(' ')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.table}>
              <h1>Relative Frequency</h1>
              <div className={classes.displayContainer}>
                <div>
                  <h1>(RF) %</h1>
                  <div className={classes.display}>
                    <div className="label">{formatArray(myArray).join(' ')}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div> 
      </div>
      <Footer/>  
    </>
  )
}

export default StatisticCalculator