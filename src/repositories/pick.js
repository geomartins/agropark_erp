import {firestoreTimestamp, timestamp } from '../boot/firebase'
import { date } from 'quasar'
const purifyObject = (data) => {
    return Object.assign({}, data);
}

const convertJSDateToServerTimestamp = (date) => {
  return firestoreTimestamp.fromDate(date);
}

const convertServerTimestampToJSDate = (timestamp) => {
  let jsDate = timestamp.toDate();
  return date.formatDate(jsDate, 'YYYY-MM-DD');
}

const calculateDateDifference = (date1, date2, unit) => {
  if(isNaN(date1._seconds) == false){
        date1 =  new Date(date1._seconds * 1000);
  }else{
       date1 = date1.toDate();
  }
  return date.getDateDiff(date1, date2, unit)

}



const convertAccessArrayToObject = (dataArray) => {
  let obj = {};
  for(var item of dataArray){
      obj[item] = true;
  } 
  return obj;
}

const  convertAccessObjectToArray = (dataObj) => {
  let array = [];

  for(var key in dataObj){
    array.push(key.toString());
  }

  return array;
}

const generateUid = (name) => {
  let trimmedName = name.trim();
  let filteredName = trimmedName.replace(/\s/g, '-');
  return filteredName;
  //return filteredName+'.'+makeid(5);

}

const  makeid = (length)  => {
  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * 
charactersLength)));
 }
 return result.join('');
}

const sortBy = (key, reverse) => {

    // Move smaller items towards the front
    // or back of the array depending on if
    // we want to sort the array in reverse
    // order or not.
    
    const moveSmaller = reverse ? 1 : -1;
  
    // Move larger items towards the front
    // or back of the array depending on if
    // we want to sort the array in reverse
    // order or not.
    const moveLarger = reverse ? -1 : 1;
   
  
    /**
     * @param  {*} a
     * @param  {*} b
     * @return {Number}
     */
    return (a, b) => {
      
      if (b[key] > a[key]) {
        return moveLarger;
      }
      if (b[key] < a[key]) {
        return moveSmaller;
      }
      return 0;
    };
  };


export {
    purifyObject,
    sortBy,
    generateUid,
    convertJSDateToServerTimestamp,
    convertServerTimestampToJSDate,
    convertAccessArrayToObject,
    convertAccessObjectToArray,
    calculateDateDifference,
}