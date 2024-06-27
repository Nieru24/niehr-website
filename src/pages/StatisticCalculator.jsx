import React from 'react'
import { useEffect, useState } from 'react';
import classes from '../pages-css/StatisticCalculator.module.css'
import Header from '../components/header/Header'
import Footer from '../components/Footer'
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
  // useEffect(() => {
  //   console.log('myArray:', formatArray(myArray));
  //   const sortedArray = formatArray(myArray);
  //   console.log(sortedArray[0]);
  //   console.log(groupedCalcArray);
  // }, [myArray]);

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
  const [classInterval, setClassInterval] = useState(0);
  const [classSize, setClassSize] = useState(0);

  // Lower And Upper Class
  const [lowerClass, setLowerClass] = useState([]);
  const [upperClass, setUpperClass] = useState([]);

  // Lower And Upper Boundary
  const [lowerBoundary, setLowerBoundary] = useState([]);
  const [upperBoundary, setUpperBoundary] = useState([]);

  // Class Mark
  const [classMarks, setClassMarks] = useState([]);

  // Frequency
  const [frequency, setFrequency] = useState([]);

  // Cumulative Frequency
  const [greaterCumulativeFrequency, setGreaterCumulativeFrequency] = useState([]);
  const [lessCumulativeFrequency, setLessCumulativeFrequency] = useState([]);

  // Cumalative Percent Frequency
  const [greaterCumulativePercentFrequency, setGreaterCumulativePercentFrequency] = useState([]);
  const [lessCumulativePercentFrequency, setLessCumulativePercentFrequency] = useState([]);

  // Relative Frequency
  const [relativeFrequency, setRelativeFrequency] = useState([]);

  // For Mean, Median and Mode of Grouped Data
  const [groupMean, setGroupMean] = useState('');
  const [groupMedian, setGroupMedian] = useState('');
  const [groupMode, setGroupMode] = useState('');

  const handleClassIntervalChange = () => {
    setIsClassInterval(true);
    setIsClassSize(false);
  };

  const handleClassSizeChange = () => {
    setIsClassInterval(false);
    setIsClassSize(true);
  };

  const handleTextSetting = (e) => {
    const value = Number(e.target.value);
    if (isClassInterval) {
      setClassInterval(value);
    } else if (isClassSize) {
      setClassSize(value);
    }
  };

  const calcsGroupedTable = () => {
    setIsClassInterval(false);
    setIsClassSize(false);

    const rangeValue = range(myArray);
    const sortedArray = formatArray(myArray);

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

    // Initialize Arrays
    const lowerClassArray = new Array(finalClassInterval + 1).fill(0); // Class Interval
    const upperClassArray = new Array(finalClassInterval + 1).fill(0); // Class Interval
    const lowerBoundaryArray = new Array(finalClassInterval + 1).fill(0); // Class Boundary
    const upperBoundaryArray = new Array(finalClassInterval + 1).fill(0); // Class Boundary
    const classMarksArray = new Array(finalClassInterval + 1).fill(0); // Class Marks
    const frequencyArray = new Array(finalClassInterval + 1).fill(0); // Frequency
    const greaterCumulativeFrequencyArray = new Array(finalClassInterval + 1).fill(0); // Cumulative Frequency
    const lessCumulativeFrequencyArray = new Array(finalClassInterval + 1).fill(0); // Cumulative Frequency
    const greaterCumulativePercentFrequencyArray = new Array(finalClassInterval + 1).fill(0); // Cumulative Percent Frequency
    const lessCumulativePercentFrequencyArray = new Array(finalClassInterval + 1).fill(0); // Cumulative Percent Frequency
    const relativeFrequencyArray = new Array(finalClassInterval + 1).fill(0); // Relative Frequency
    const productFrequencyClassMarksArray = new Array(finalClassInterval + 1).fill(0); // For Group Mean

    // First Indexes of Array
    lowerClassArray[0] = sortedArray[0];
    upperClassArray[0] = lowerClassArray[0] + roundedResult;
    lowerBoundaryArray[0] = lowerClassArray[0] - 0.5;
    upperBoundaryArray[0] = upperClassArray[0] + 0.5;
    classMarksArray[0] = (lowerBoundaryArray[0] +upperBoundaryArray[0])/2


    // Rest of Array
    for (let i = 1; i <= finalClassInterval; i++) {
      lowerClassArray[i] = upperClassArray[i - 1] + 1;
      upperClassArray[i] = lowerClassArray[i] + roundedResult;
      lowerBoundaryArray[i] = lowerClassArray[i] - 0.5;
      upperBoundaryArray[i] = upperClassArray[i] + 0.5;
      classMarksArray[i] = (lowerBoundaryArray[i] +upperBoundaryArray[i])/2;
      greaterCumulativeFrequencyArray[i] = greaterCumulativeFrequencyArray[i - 1] + frequencyArray[i];
      lessCumulativeFrequencyArray[i] = lessCumulativeFrequencyArray[i - 1] - frequencyArray[i - 1];
    }
 

    // Frequency using dictionary
    const findClassIntervalIndex = (value) => {
      if (lowerClassArray.length > 1) {
        for (let i = 0; i < lowerClassArray.length; i++) {
          if (value >= lowerClassArray[i] && value <= upperClassArray[i]) {
            return i;
          }
        }
      }
      return -1;
    };

    const frequencyDict = {};

    sortedArray.forEach((value) => {
      const classIntervalIndex = findClassIntervalIndex(value);
      if (classIntervalIndex !== -1) {
        if (frequencyDict[classIntervalIndex]) {
          frequencyDict[classIntervalIndex] += 1;
        } else {
          frequencyDict[classIntervalIndex] = 1;
        }
      }
    });

    for (const [key, value] of Object.entries(frequencyDict)) {
      const index = parseInt(key);
      if (index >= 0 && index < frequencyArray.length) {
        frequencyArray[index] = value;
      }
    }

    // First Indexes of Frequency Related Array (This is here because it can't be on top of frequency)
    greaterCumulativeFrequencyArray[0] = frequencyArray[0];
    lessCumulativeFrequencyArray[0] = sortedArray.length;
    greaterCumulativePercentFrequencyArray[0] = parseFloat(((greaterCumulativeFrequencyArray[0] / sortedArray.length) * 100).toFixed(2));
    lessCumulativePercentFrequencyArray[0] = parseFloat(((lessCumulativeFrequencyArray[0] / sortedArray.length) * 100).toFixed(2));
    relativeFrequencyArray[0] = parseFloat(((frequencyArray[0]/sortedArray.length) * 100).toFixed(2));

    // Rest of Array (This is here because it can't be on top of frequency)
    for (let i = 1; i <= finalClassInterval; i++) {
      greaterCumulativeFrequencyArray[i] = greaterCumulativeFrequencyArray[i - 1] + frequencyArray[i];
      lessCumulativeFrequencyArray[i] = lessCumulativeFrequencyArray[i - 1] - frequencyArray[i - 1];
      greaterCumulativePercentFrequencyArray[i] = parseFloat(((greaterCumulativeFrequencyArray[i] / sortedArray.length) * 100).toFixed(2));
      lessCumulativePercentFrequencyArray[i] = parseFloat(((lessCumulativeFrequencyArray[i] / sortedArray.length) * 100).toFixed(2));
      relativeFrequencyArray[i] = parseFloat(((frequencyArray[i]/sortedArray.length) * 100).toFixed(2));
    }


    // For Mean, Median and Mode of Grouped Data Calculation
    // Mean
    for (let i = 0; i < finalClassInterval; i++) {
      productFrequencyClassMarksArray[i] = classMarksArray[i] * frequencyArray[i];
    }

    const groupMeanValue = (productFrequencyClassMarksArray.reduce((a, b) => a + b, 0) / sortedArray.length).toFixed(2);

    // Median
    let n2 = sortedArray.length / 2;
    let classSizeValue = (upperClassArray[0] - lowerClassArray[0]) + 1;
    let cfb = 0;
    let holder1 = 0;

    for (let i = 0; i < finalClassInterval; i++) {
      if (i > 0 && greaterCumulativeFrequencyArray[i] >= n2) {
        cfb = greaterCumulativeFrequencyArray[i - 1];
        break;
      }
    }

    for (let i = 0; i < finalClassInterval; i++) {
      if (greaterCumulativeFrequencyArray[i] > n2) {
        holder1 = i;
        break;
      }
    }

    let lmd = lowerBoundaryArray[holder1];
    let fmd = frequencyArray[holder1];

    const groupMedianValue = (lmd + ((n2 - cfb) / fmd) * classSizeValue).toFixed(2);

    // Mode
    let highestFrequencyIndex = 0;
    let fmo = 0;
    let f1 = 0;
    let f2 = 0;
    let lmo = 0;

    for (let i = 0; i < finalClassInterval; i++) {
      if (highestFrequencyIndex === 0 || frequencyArray[i] > frequencyArray[highestFrequencyIndex]) {
        highestFrequencyIndex = i;
      }
    }

    if (highestFrequencyIndex >= 0 && highestFrequencyIndex < frequencyArray.length) {
      
      fmo = frequencyArray[highestFrequencyIndex];
      lmo = lowerBoundaryArray[highestFrequencyIndex];

      if (highestFrequencyIndex - 1 >= 0) {
        f1 = frequencyArray[highestFrequencyIndex - 1];
      }
      if (highestFrequencyIndex + 1 < frequencyArray.length) {
        f2 = frequencyArray[highestFrequencyIndex + 1];
      }
    }

    
    
    let groupModeValue = (lmo + ((fmo - f1) / ((2 * fmo) - f1 - f2)) * classSizeValue).toFixed(2);
    setGroupMean(groupMeanValue);
    setGroupMedian(groupMedianValue);
    setGroupMode(groupModeValue);

    // Set Arrays
    setLowerClass(lowerClassArray);
    setUpperClass(upperClassArray);
    setLowerBoundary(lowerBoundaryArray);
    setUpperBoundary(upperBoundaryArray);
    setClassMarks(classMarksArray);
    setFrequency(frequencyArray);
    setGreaterCumulativeFrequency(greaterCumulativeFrequencyArray);
    setLessCumulativeFrequency(lessCumulativeFrequencyArray);
    setGreaterCumulativePercentFrequency(greaterCumulativePercentFrequencyArray);
    setLessCumulativePercentFrequency(lessCumulativePercentFrequencyArray);
    setRelativeFrequency(relativeFrequencyArray);
    

    // Cleaning Excess Indexes
    while (lowerClassArray[lowerClassArray.length - 1] > sortedArray[sortedArray.length - 1]) {
      lowerClassArray.pop();
      upperClassArray.pop();
      lowerBoundaryArray.pop();
      upperBoundaryArray.pop();
      classMarksArray.pop();
      frequencyArray.pop();
      greaterCumulativeFrequencyArray.pop();
      lessCumulativeFrequencyArray.pop();
      greaterCumulativePercentFrequencyArray.pop();
      lessCumulativePercentFrequencyArray.pop();
      relativeFrequencyArray.pop();
    }

    
    console.log(`highestFrequencyIndex:  ${highestFrequencyIndex}`)
    console.log(`fmo:  ${fmo}`)
    console.log(`f1:  ${f1}`)
    console.log(`f2:  ${f2}`)
    console.log(`lmo:  ${lmo}`)
    // console.log(`Grouped Median:  ${groupMedianValue}`)
    // console.log(`Grouped Mode:  ${groupModeValue}`)
    // console.log(` ${productFrequencyClassMarksArray}`)
  };
  
  
  // Percentiles
  const [percentile, setPercentile] = useState(null);
  const [pi, setPi] = useState(0);
  const [li, setLi] = useState(0);
  const [cfbi, setCfbi] = useState(0);
  const [fi, setFi] = useState(0);
  const [in100, setIn100] = useState(0);

  const handlePercentiles = (event) => {
    const inputValue = event.target.value.trim(); // Trim whitespace
    console.log("Input Value:", inputValue);

    let inputPi = parseFloat(inputValue);
    console.log("Parsed Value:", inputPi);

    if (isNaN(inputPi)) {
      console.log("Input is not a number.");
      inputPi = 0;
    } else if (inputPi < 0 || inputPi > 100) {
      console.log("Input is out of range (0-100).");
      inputPi = 0;
    }

    setPi(inputPi);

    const calculatedIn100 = (inputPi * myArray.length) / 100;
    console.log("Calculated in100:", calculatedIn100);
    setIn100(calculatedIn100);

    for (let i = 0; i < greaterCumulativeFrequency.length; i++) {
      if (i > 0 && greaterCumulativeFrequency[i] >= calculatedIn100) {
        setCfbi(greaterCumulativeFrequency[i - 1]);
        setFi(frequency[i]);
        setLi(lowerBoundary[i]);
        break;
      }
    }

    const calculatedPercentile =
      li + ((calculatedIn100 - cfbi) / fi) * ((upperClass[0] - lowerClass[0]) + 1);
    console.log("Calculated Percentile:", calculatedPercentile);
    setPercentile(calculatedPercentile);
  };

  useEffect(() => {
    const sortedArray = formatArray(myArray);
    console.log(sortedArray[0]);
    // console.log(groupedCalcArray);
  }, [myArray]);

  return (
    <>
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
                      value={isClassInterval ? classInterval : isClassSize ? classSize : ''}
                      onChange={handleTextSetting} 
                      min="1" 
                      placeholder="Enter a number" 
                      disabled={!isClassInterval && !isClassSize}
                  />
              </div>
              <button onClick={calcsGroupedTable}>Calculate</button>
            </div>

            <div className={classes.groupedCalculation}>
              <h1 className={classes.name}>Grouped Data Calculation (In work)</h1>
              <div className={classes.labelsContainer}>
                <div className={classes.label}>Mean: {groupMean}</div>
                <div className={classes.label}>Median: {groupMedian}</div>
                <div className={classes.label}>Mode: {groupMode}</div>
              </div>
            </div>

            <div className={classes.percentiles}>
              <h1>Percentiles (In work)</h1>
              
              <div className={classes.labelsContainer}>
                <div className={classes.input}>i = 
                  <input 
                    type="number" 
                    onChange={handlePercentiles} 
                    min="0" 
                    max="100"
                    placeholder="Enter a number" 
                  />
                </div>
                <div className={classes.label}>Percentiles = {percentile}</div>
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
                    <div className="label">{lowerClass.join(' ')}</div>
                  </div>
                </div>
                <div>
                  <h1>UC</h1>
                  <div className={classes.display}>
                    <div className="label">{upperClass.join(' ')}</div>
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
                    <div className="label">{lowerBoundary.join(' ')}</div>
                  </div>
                </div>
                <div>
                  <h1>UB</h1>
                  <div className={classes.display}>
                    <div className="label">{upperBoundary.join(' ')}</div>
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
                    <div className="label">{classMarks.join(' ')}</div>
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
                    <div className="label">{frequency.join(' ')}</div>
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
                    <div className="label">{greaterCumulativeFrequency.join(' ')}</div>
                  </div>
                </div>
                <div>
                  <h1>&lt;cf</h1>
                  <div className={classes.display}>
                    <div className="label">{lessCumulativeFrequency.join(' ')}</div>
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
                    <div className="label">{greaterCumulativePercentFrequency.join(' ')}</div>
                  </div>
                </div>
                <div>
                  <h1>&lt;cpf</h1>
                  <div className={classes.display}>
                    <div className="label">{lessCumulativePercentFrequency.join(' ')}</div>
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
                    <div className="label">{relativeFrequency.join(' ')}</div>
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